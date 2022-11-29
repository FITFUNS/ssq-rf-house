function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function int2float(v) {
  if (Array.isArray(v)) {
    let r = [];
    for (const a of v) {
      r.push(a / 10);
    }
    return r;
  } else {
    return v / 10;
  }
}

function float2int(v) {
  if (Array.isArray(v)) {
    let r = [];
    for (const a of v) {
      r.push((a * 10) | 0);
    }
    return r;
  } else {
    return (v * 10) | 0;
  }
}
function setMat4Forward() {
  return (function () {
    var x, y, z;
    x = new pc.Vec3();
    y = new pc.Vec3();
    z = new pc.Vec3();
    return function (mat4, forward, up) {
      // Inverse the forward direction as +z is pointing backwards due to the coordinate system
      z.copy(forward).scale(-1);
      // z.copy(forward);
      y.copy(up).normalize();
      x.cross(y, z).normalize();
      z.cross(x, y);
      var r = mat4.data;
      r[0] = x.x;
      r[1] = x.y;
      r[2] = x.z;
      r[3] = 0;
      r[4] = y.x;
      r[5] = y.y;
      r[6] = y.z;
      r[7] = 0;
      r[8] = z.x;
      r[9] = z.y;
      r[10] = z.z;
      r[11] = 0;
      r[15] = 1;
      return mat4;
    };
  })();
}
class MatchHandler extends pc.ScriptType {
  initialize() {
    this.app.matchHandler = this;
    window.addEventListener("message", this.onMessage.bind(this));
    window.parent.postMessage({ type: "request_house_init" }, "*");
    this.name_screen = this.app.root.findByName("name_screen");
    this.nameTag = this.name_screen.children[0];

    this.on("destroy", () => {
      window.removeEventListener("message", this.onMessage.bind(this));
    });

    this.opCode = {
      MATCH_STATE: 1,
      PACK_MESSAGE: 2,
      PLAYER_SPAWN: 3,
      PLAYER_MOVE: 4,
      PLAYER_SET_ITEM: 5,
      PLAYER_ROTATE_ITEM: 6,
      PLAYER_COLLECT_ITEM: 7,
      SEND_EMOTION: 27,
    };

    this._matchData = [];
    this._matchPresenceEvents = [];
    this.playerMap = new Map();

    this.player_root = this.app.assets.find("player_root", "template").resource;
    this.player_model = this.app.assets.find(
      "player_model",
      "template"
    ).resource;
    this._root = this.app.root.findByName("Root");

    this.select_char =
      this.app.root.findByTag("data_ref")[0].script.dataRef.select_char;

    this._matchHandler = this.app.root.findByName("MatchHandler");
    this._matchHandler.script.inputManager.enabled = true;
    this._mainCamera = this.app.root.findByTag("camera")[0];
  }

  update() {
    if (this._matchPresenceEvents.length > 0) {
      this._matchPresenceEvents.forEach((ev) => {
        this.processMatchPresence(ev.event, ev.match);
      });
      this._matchPresenceEvents.length = 0;
    }

    if (this._matchData.length) {
      this._matchData.forEach((d) => {
        this.processMatchData(
          d.match_id,
          d.op_code,
          d.data,
          d.presence,
          d.match
        );
      });
      this._matchData.length = 0;
    }
    this.playerMap.forEach((player) => {
      if (!player.name_pivot) return;
      const pos = this._mainCamera.camera.worldToScreen(
        player.name_pivot.getPosition()
      );
      pos.x *= this.app.graphicsDevice.maxPixelRatio;
      pos.y *= this.app.graphicsDevice.maxPixelRatio;
      pos.y = this.name_screen.screen.resolution.y - pos.y;
      if (pos.z < 0) {
        player.nameTag.enabled = false;
      } else {
        if (!this.localPlayer) return;
        if (player.getPosition().distance(this.localPlayer.getPosition()) > 5) {
          player.nameTag.enabled = false;
          return;
        }
        player.nameTag.enabled = true;
        player.nameTag.setLocalPosition(pos);
      }
    });
  }

  onMessage(message) {
    const data = message.data;
    if (
      data.type !== "house_init" &&
      data.type !== "house_chat" &&
      data.type !== "house_rotate_item" &&
      data.type !== "house_collect_item" &&
      data.type !== "get_match_info"
    )
      return;
    switch (data.type) {
      case "house_init":
        this.onHouseInit(data);
        break;
      case "house_chat":
        this.onHouseChat(data);
        break;
      case "house_rotate_item":
        this.sendRotateHouseItem(data.oid);
        break;
      case "house_collect_item":
        this.sendCollectHouseItem(data.oid);
        break;
      case "get_match_info":
        this.onGetMatchInfo();
        break;
      default:
        break;
    }
  }

  onHouseInit(data) {
    const matchConfig = data.matchConfig;
    this.name_screen.enabled = true;
    this.nameTag.children[0].element.text = data.display_name;
    this.nameTag.element.width = this.nameTag.children[0].element.width + 36;
    (async () => {
      const matchs = matchConfig.scenes[this.matchName];
      let serverkey = "";
      let host = "";
      let port = "";
      let useSSL = false;
      let verbose = false;
      let protobuf = false;
      for (const match of matchs) {
        serverkey = matchConfig.servers[match].serverkey;
        host = matchConfig.servers[match].host;
        port = matchConfig.servers[match].port;
        useSSL = port.indexOf("443") > -1 ? true : false;
        protobuf = true;

        const drv = new ffnet.NetDriver();
        const cid = data.custom_id;
        const username = data.username;
        drv.initialize(
          this.app,
          {
            host: host,
            port: port,
            serverkey: serverkey,
            useSSL: useSSL,
          },
          "match"
        );
        if (
          !(await drv.authenticate(
            { cid: cid, session_key: data.session_key },
            true,
            username
          ))
        )
          continue;
        if (!(await drv.connect(useSSL, verbose, protobuf))) continue;

        const searchResult = await drv.gameplay.createMatch(
          "create_match",
          JSON.stringify({
            handler: this.matchName,
            owner_id: data.owner_id,
            query: "+label.handler:" + data.owner_id,
          })
        );
        const parsed = JSON.parse(searchResult);
        this.match_id = parsed.match_id;
        this.nakamaMatch = window.nakamaMatch = drv;
        break;
      }

      await this.nakamaMatch.gameplay.joinMatch(
        this.match_id,
        this.onMatchData,
        this.onMatchPresence,
        this
      );

      this.nakamaMatch.social.joinRoom(
        data.owner_id,
        true,
        false,
        this.onHouseChannelMessage,
        this.onHouseChannelPresence,
        this
      );

      this.match_owner = data.owner_id;
    })();
  }

  onHouseChat(data) {
    this.nakamaMatch.social.writeChatById(`2...${this.match_owner}`, {
      msg: data.msg,
      sender: data.sender,
      display_name: data.display_name,
    });
  }

  onMatchData(match_id, op_code, data, presence, match) {
    switch (op_code) {
      case this.opCode.PACK_MESSAGE:
        this.onPackMessage(match_id, op_code, data, presence, match);
        break;
      default:
        this._matchData.push({ match_id, op_code, data, presence, match });
        break;
    }
  }

  onMatchPresence(matchPresenceEvent, match) {
    this._matchPresenceEvents.push({ event: matchPresenceEvent, match: match });
  }

  onHouseChannelMessage(data) {
    (async () => {
      let account;
      if (this.nakamaMatch.account) {
        account = this.nakamaMatch.account;
      } else {
        account = await this.nakamaMatch.Account.get();
      }
      window.parent.postMessage(
        {
          type: "fire#house",
          action: "chat",
          data: data.content,
          my_id: account.user.id,
        },
        "*"
      );
    })();
  }

  onHouseChannelPresence() { }

  onPackMessage(match_id, op_code, data, presence, match) {
    for (const matchData of data) {
      const pack_op_code = matchData[0];
      const pack_data = matchData[1];
      const pack_sender = { user_id: matchData[2] };
      this._matchData.push({
        match_id: match_id,
        op_code: pack_op_code,
        data: pack_data,
        presence: pack_sender,
        match: match,
      });
    }
  }

  onMatchState(match_id, op_code, data, presence, match) {
    this.spawnPlayerBatch(data.players);
    this.spawnObjectBatch(data.objects);
    setTimeout(async () => {
      const account = await this.nakamaMatch.Account.get();
      const metadata = JSON.parse(account.user.metadata);
      const char_type = getRandomInt(0, 5);
      await this.sendMatchState(this.opCode.PLAYER_SPAWN, {
        user_id: account.user_id,
        char_type: char_type,
        level: metadata.level ? metadata.level : 1,
        house_owner: metadata.house_owner ? 1 : 0,
        display_name: window.btoa(
          encodeURIComponent(account.user.display_name)
        ),
      });
    }, 0);
  }

  onPlayerSpawn(match_id, op_code, data, presence, match) {
    if (data.user_id === this.nakamaMatch.Account.user().id) {
      if (this.playerMap.get(data.user_id)) return;
      const inst = this.spawnPlayer(data, true);
      this.localPlayer = inst;
      if (this._mainCamera) {
        this._mainCamera.script.orthoCamera.enabled = true;
        this._mainCamera.script.orthoCamera.lookAt = inst;
      }

      this._matchHandler.script.inputManager.inputTarget = inst;
    } else {
      if (this.playerMap.get(data.user_id)) return;
      this.spawnPlayer(data, false);
    }
  }

  onPlayerMove(match_id, op_code, data, presence, match) {
    const player = this.playerMap.get(presence.user_id);
    if (!player) return;
    const pos = int2float(data.pos);
    const vec = new pc.Vec3(pos[0], pos[1], pos[2]);
    player.fire("#move", vec, data.ext);
  }

  onPlayerSetItem(match_id, op_code, data, presence, match) {
    this.app.objectManager.spawn(data);
    if (data.setter === this.localPlayer.name) {
      window.parent.postMessage(
        {
          type: "house_set_item",
        },
        "*"
      );
    }
  }

  onPlayerRotateItem(match_id, op_code, data, presence, match) {
    this.app.objectManager.rotate(data.oid, data.rotY);
  }

  onPlayerCollectItem(match_id, op_code, data, presence, match) {
    this.app.objectManager.destroy(data.oid);
  }

  async sendMatchState(op_code, data, presences = null) {
    return await this.nakamaMatch.sendMatchState(
      this.match_id,
      op_code,
      data,
      presences
    );
  }
  onGetMatchInfo() {
    const temp = [];
    this.playerMap.forEach((player) => {
      const info = {
        display_name: player.display_name,
        user_id: player.name,
        title: player.title ? player.title : null,
        house_owner: player.house_owner ? 1 : 0,
        level: player.level ? player.level : 1,
      };
      temp.push(info);
    });
    window.parent.postMessage({ type: "get_match_info", info: temp }, "*");
  }

  sendPlayerMove(t_pos, ext = false) {
    setTimeout(
      async (t_pos, ext) => {
        const pos =
          t_pos instanceof pc.Vec3 ? [t_pos.x, t_pos.y, t_pos.z] : t_pos;
        await this.sendMatchState(this.opCode.PLAYER_MOVE, {
          pos: float2int(pos),
        });
      },
      0,
      t_pos,
      ext
    );
  }

  sendSetHouseItem(itemPos, itemType) {
    setTimeout(
      async (itemPos, itemType) => {
        await this.sendMatchState(this.opCode.PLAYER_SET_ITEM, {
          pos: itemPos,
          type: itemType,
        });
      },
      0,
      itemPos,
      itemType
    );
  }

  sendRotateHouseItem(oid) {
    setTimeout(
      async (oid) => {
        await this.sendMatchState(this.opCode.PLAYER_ROTATE_ITEM, { oid: oid });
      },
      0,
      oid
    );
  }

  sendCollectHouseItem(oid) {
    setTimeout(
      async (oid) => {
        await this.sendMatchState(this.opCode.PLAYER_COLLECT_ITEM, {
          oid: oid,
        });
      },
      0,
      oid
    );
  }

  processMatchData(match_id, op_code, data, presence, match) {
    switch (op_code) {
      case this.opCode.MATCH_STATE:
        this.onMatchState(match_id, op_code, data, presence, match);
        break;
      case this.opCode.PLAYER_SPAWN:
        this.onPlayerSpawn(match_id, op_code, data, presence, match);
        break;
      case this.opCode.PLAYER_MOVE:
        this.onPlayerMove(match_id, op_code, data, presence, match);
        break;
      case this.opCode.PLAYER_SET_ITEM:
        this.onPlayerSetItem(match_id, op_code, data, presence, match);
        break;
      case this.opCode.PLAYER_ROTATE_ITEM:
        this.onPlayerRotateItem(match_id, op_code, data, presence, match);
        break;
      case this.opCode.PLAYER_COLLECT_ITEM:
        this.onPlayerCollectItem(match_id, op_code, data, presence, match);
        break;
      default:
        break;
    }
  }

  processMatchPresence(matchPresenceEvent, match) {
    const leaves = matchPresenceEvent.leaves;

    if (leaves && leaves.length > 0) {
      leaves.forEach((player) => {
        player.nameTag.destroy();
        this.destroyPlayer(player.user_id);
      });
    }
  }

  spawnPlayerBatch(players) {
    const accountUserId = this.nakamaMatch.Account.user_id();
    for (const playerInfo of players) {
      if (playerInfo.user_id !== accountUserId) {
        this.spawnPlayer(playerInfo, false);
      }
    }
  }

  spawnObjectBatch(objects) {
    if (Array.isArray(objects)) {
      objects.forEach((object) => {
        this.app.objectManager.spawn(object);
      });
    }
  }

  spawnPlayer(playerInfo, self) {
    const inst = this.player_root.instantiate();
    const modelInst = this.player_model.instantiate();
    modelInst.name = "spawn_model";
    let modelAsset = Number(playerInfo.char_type)
      ? this.select_char[playerInfo.char_type].model
      : this.select_char[0].model;
    if (modelAsset) {
      if (!modelAsset.loaded) this.app.assets.load(modelAsset);
      modelInst.model.asset = modelAsset;
    }
    inst.addChild(modelInst);
    inst.name = playerInfo.user_id;
    inst.display_name = decodeURIComponent(
      window.atob(playerInfo.display_name)
    );
    inst.tags.add("player");
    inst.house_owner = playerInfo.house_owner;
    inst.level = playerInfo.level;
    this.playerMap.set(playerInfo.user_id, inst);
    if (playerInfo.pos) {
      const pos = int2float(playerInfo.pos);
      if (inst.rigidbody && inst.rigidbody.enabled) {
        inst.rigidbody.teleport(pos[0], pos[1], pos[2]);
      } else {
        inst.setPosition(pos[0], pos[1], pos[2]);
      }
    }

    if (self) {
      inst.nameTag = this.nameTag;
      inst.tags.add("self");
    } else {
      inst.nameTag = this.nameTag.clone();
      inst.nameTag.findByName("Text").element.text = inst.display_name;
      inst.nameTag.element.width =
        inst.nameTag.findByName("Text").element.width + 36;
      this.name_screen.addChild(inst.nameTag);
    }
    this._root.addChild(inst);
    return inst;
  }

  destroyPlayer(user_id) {
    const player = this.playerMap.get(user_id);
    if (player) {
      this.playerMap.delete(user_id);
      setTimeout((p) => p.destroy(), 0, player);
    }
  }
}

pc.registerScript(MatchHandler, "matchHandler");

MatchHandler.attributes.add("matchName", { type: "string", default: "house" });
