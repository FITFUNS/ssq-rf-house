pc.script.createLoadingScreen(function (app) {
  var showSplash = function () {
    // splash wrapper
    var wrapper = document.createElement("div");
    wrapper.id = "application-splash-wrapper";
    document.body.appendChild(wrapper);

    // splash
    var splash = document.createElement("div");
    splash.id = "application-splash";
    wrapper.appendChild(splash);
    splash.style.display = "flex";
    splash.style.flexDirection = "column";
    splash.style.alignItems = "center";
    splash.style.gap = "16px";
    var icons = document.createElement("div");
    icons.id = "application-icons";
    icons.style.display = "flex";
    icons.style.height = "50px";
    splash.appendChild(icons);
    var logo = document.createElement("div");
    logo.id = "logo";
    logo.innerHTML = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.4475 39.5964L21.6287 48.4602C22.6752 49.0705 23.8648 49.3921 25.0763 49.3921C26.2877 49.3921 27.4773 49.0705 28.5238 48.4602L43.705 39.5964C44.7558 38.9775 45.6266 38.0949 46.2313 37.0359C46.836 35.9769 47.1535 34.7784 47.1525 33.5589V15.8314C47.1535 14.612 46.836 13.4134 46.2313 12.3544C45.6266 11.2954 44.7558 10.4128 43.705 9.79391L28.5238 0.938913C27.4788 0.32417 26.2886 0 25.0763 0C23.8639 0 22.6736 0.32417 21.6287 0.938913L6.4475 9.79391C5.39675 10.4128 4.5259 11.2954 3.92121 12.3544C3.31652 13.4134 2.99897 14.612 3 15.8314V33.5589C2.99897 34.7784 3.31652 35.9769 3.92121 37.0359C4.5259 38.0949 5.39675 38.9775 6.4475 39.5964Z" fill="white"/>
<path d="M27.261 9.30502C29.27 9.0931 27.617 15.3913 28.3121 19.3838C29.0072 23.3763 31.5163 21.0791 34.907 21.6047C43.1209 23.0712 28.3121 36.778 25.2775 39.2362C22.2428 41.6945 21.802 38.8209 21.8868 38.2784C21.9716 37.7358 23.1159 28.2335 20.2677 27.5384C18.1147 27.4536 14.3341 29.115 13.0965 26.2499C11.8419 20.2569 23.2176 11.6107 24.4383 10.5172C25.1652 9.86236 26.0716 9.44017 27.0406 9.30502" fill="#DBE1FF"/>
</svg>

`;
    logo.style.position = "relative";
    logo.style.left = "25px";
    icons.appendChild(logo);

    var bar = document.createElement("div");
    bar.id = "progress-bar";
    bar.innerHTML = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.4475 39.5964L21.6287 48.4602C22.6752 49.0705 23.8648 49.3921 25.0763 49.3921C26.2877 49.3921 27.4773 49.0705 28.5238 48.4602L43.705 39.5964C44.7558 38.9775 45.6266 38.0949 46.2313 37.0359C46.836 35.9769 47.1535 34.7784 47.1525 33.5589V15.8314C47.1535 14.612 46.836 13.4134 46.2313 12.3544C45.6266 11.2954 44.7558 10.4128 43.705 9.79391L28.5238 0.938913C27.4788 0.32417 26.2886 0 25.0763 0C23.8639 0 22.6736 0.32417 21.6287 0.938913L6.4475 9.79391C5.39675 10.4128 4.5259 11.2954 3.92121 12.3544C3.31652 13.4134 2.99897 14.612 3 15.8314V33.5589C2.99897 34.7784 3.31652 35.9769 3.92121 37.0359C4.5259 38.0949 5.39675 38.9775 6.4475 39.5964Z" fill="white"/>
<path d="M27.261 9.30502C29.27 9.0931 27.617 15.3913 28.3121 19.3838C29.0072 23.3763 31.5163 21.0791 34.907 21.6047C43.1209 23.0712 28.3121 36.778 25.2775 39.2362C22.2428 41.6945 21.802 38.8209 21.8868 38.2784C21.9716 37.7358 23.1159 28.2335 20.2677 27.5384C18.1147 27.4536 14.3341 29.115 13.0965 26.2499C11.8419 20.2569 23.2176 11.6107 24.4383 10.5172C25.1652 9.86236 26.0716 9.44017 27.0406 9.30502" fill="url(#paint0_linear_1107_92337)"/>
<defs>
<linearGradient id="paint0_linear_1107_92337" x1="37" y1="-5.00018" x2="25.1792" y2="40.2166" gradientUnits="userSpaceOnUse">
<stop stop-color="#5A39FF"/>
<stop offset="1" stop-color="#0046FF"/>
</linearGradient>
</defs>
</svg>
`;
    bar.style.position = "relative";
    bar.style.right = "25px";
    icons.appendChild(bar);
    var shinamon = document.createElement("div");
    shinamon.innerHTML = `<svg width="137" height="27" viewBox="0 0 137 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M37.132 8.15889V19.3239C37.132 19.7633 36.9581 20.1848 36.6482 20.4964C36.3383 20.8079 35.9177 20.9841 35.4783 20.9864H35.2683C35.0504 20.9864 34.8346 20.9433 34.6334 20.8597C34.4322 20.776 34.2495 20.6534 34.0958 20.4989C33.9421 20.3444 33.8205 20.1611 33.7379 19.9594C33.6553 19.7578 33.6134 19.5418 33.6145 19.3239V7.85263C33.6145 7.41403 33.7888 6.9934 34.0989 6.68326C34.409 6.37312 34.8297 6.19888 35.2683 6.19888H35.4783C35.9169 6.19888 36.3375 6.37312 36.6477 6.68326C36.9578 6.9934 37.132 7.41403 37.132 7.85263V8.15889Z" fill="white"/>
<path d="M36.1433 0.458881C35.747 0.313003 35.3172 0.283973 34.9049 0.375248C34.4926 0.466523 34.1152 0.674259 33.8175 0.973766C33.5199 1.27327 33.3145 1.65195 33.2257 2.06479C33.137 2.47763 33.1687 2.90727 33.317 3.30263C33.4176 3.60516 33.5868 3.8803 33.8115 4.10649C34.0362 4.33268 34.3102 4.50379 34.612 4.60639C35.0085 4.75428 35.4392 4.7854 35.8529 4.69607C36.2666 4.60674 36.646 4.40071 36.9461 4.10237C37.2463 3.80403 37.4547 3.42589 37.5466 3.01276C37.6384 2.59963 37.61 2.16882 37.4645 1.77138C37.3795 1.45555 37.2126 1.1678 36.9805 0.937303C36.7485 0.706806 36.4596 0.541757 36.1433 0.458881Z" fill="white"/>
<path d="M117.614 6.97764C116.852 6.26992 115.961 5.71454 114.989 5.34139C114.028 4.96915 113.01 4.76492 111.979 4.73764C110.913 4.75294 109.862 4.98827 108.891 5.42888C107.913 5.81693 107.032 6.41423 106.309 7.17888C105.553 7.94171 104.957 8.84941 104.559 9.84764C104.167 10.7917 103.982 11.8094 104.017 12.8314C103.989 13.8928 104.196 14.9472 104.621 15.9201C105.016 16.8917 105.565 17.7929 106.248 18.5889C107.026 19.3409 107.929 19.9509 108.917 20.3914C109.891 20.8125 110.945 21.0184 112.006 20.9951C113.124 21.0197 114.234 20.8143 115.269 20.3914C116.268 20.017 117.155 19.3971 117.851 18.5889C118.615 17.8659 119.212 16.985 119.601 16.0076C119.988 14.9626 120.193 13.8585 120.204 12.7439C120.181 11.6759 119.946 10.6232 119.513 9.64639C119.095 8.62216 118.445 7.70872 117.614 6.97764ZM115.287 16.1739C114.433 16.9847 113.305 17.444 112.128 17.4602C110.951 17.4764 109.81 17.0484 108.934 16.2614C108.106 15.3126 107.673 14.0814 107.727 12.8226C107.703 11.6186 108.134 10.4498 108.934 9.55014C109.346 9.12801 109.841 8.79578 110.388 8.5744C110.935 8.35303 111.521 8.2473 112.111 8.26389C112.692 8.25714 113.268 8.36953 113.804 8.59412C114.34 8.81872 114.824 9.15076 115.227 9.56974C115.629 9.98872 115.942 10.4858 116.145 11.0302C116.348 11.5746 116.437 12.1549 116.407 12.7351C116.49 13.9828 116.089 15.2146 115.287 16.1739Z" fill="white"/>
<path d="M23.097 5.25387C22.0078 5.26335 20.9367 5.53338 19.9733 6.04138C19.9584 6.04894 19.9419 6.05252 19.9253 6.05181C19.9087 6.05109 19.8926 6.04608 19.8785 6.03727C19.8644 6.02845 19.8528 6.01614 19.8449 6.00152C19.837 5.98691 19.8329 5.9705 19.8333 5.95387V2.12137C19.8333 1.65724 19.6489 1.21212 19.3207 0.88393C18.9925 0.555742 18.5474 0.371368 18.0833 0.371368C17.6191 0.371368 17.174 0.555742 16.8458 0.88393C16.5176 1.21212 16.3333 1.65724 16.3333 2.12137V19.2189C16.3333 19.683 16.5176 20.1281 16.8458 20.4563C17.174 20.7845 17.6191 20.9689 18.0833 20.9689C18.5474 20.9689 18.9925 20.7845 19.3207 20.4563C19.6489 20.1281 19.8333 19.683 19.8333 19.2189V11.9564C19.8333 11.1024 20.1725 10.2834 20.7764 9.67949C21.3802 9.07562 22.1993 8.73638 23.0533 8.73638C23.9073 8.73638 24.7263 9.07562 25.3301 9.67949C25.934 10.2834 26.2733 11.1024 26.2733 11.9564V24.5914C26.2733 25.0694 26.4632 25.5279 26.8012 25.8659C27.1392 26.204 27.5977 26.3939 28.0758 26.3939C28.5538 26.3939 29.0123 26.204 29.3503 25.8659C29.6884 25.5279 29.8783 25.0694 29.8783 24.5914V12.0439C29.8578 10.2509 29.1371 8.53699 27.87 7.26827C26.6029 5.99955 24.89 5.2766 23.097 5.25387Z" fill="white"/>
<path d="M47.6494 5.25389C45.8542 5.27212 44.1377 5.99335 42.8683 7.26279C41.5988 8.53223 40.8776 10.2487 40.8594 12.0439V19.3239C40.8594 19.7648 41.0345 20.1877 41.3463 20.4994C41.6581 20.8112 42.0809 20.9864 42.5219 20.9864H42.8106C43.25 20.9841 43.6706 20.8079 43.9805 20.4964C44.2904 20.1848 44.4644 19.7633 44.4644 19.3239V11.9564C44.5074 11.1303 44.8659 10.3522 45.4659 9.7827C46.0658 9.21318 46.8615 8.89567 47.6887 8.89567C48.516 8.89567 49.3116 9.21318 49.9116 9.7827C50.5116 10.3522 50.8701 11.1303 50.9131 11.9564V19.3239C50.9131 19.7648 51.0883 20.1877 51.4001 20.4994C51.7118 20.8112 52.1347 20.9864 52.5756 20.9864H52.7769C53.2178 20.9864 53.6407 20.8112 53.9524 20.4994C54.2642 20.1877 54.4394 19.7648 54.4394 19.3239V12.0439C54.4347 10.2445 53.7179 8.52011 52.4455 7.24774C51.1731 5.97537 49.4488 5.25851 47.6494 5.25389Z" fill="white"/>
<path d="M126.714 17.2501V11.9564C126.757 11.1303 127.116 10.3522 127.716 9.7827C128.316 9.21318 129.112 8.89567 129.939 8.89567C130.766 8.89567 131.562 9.21318 132.162 9.7827C132.762 10.3522 133.12 11.1303 133.163 11.9564V19.3239C133.163 19.7648 133.338 20.1877 133.65 20.4994C133.962 20.8112 134.385 20.9864 134.826 20.9864H135.027C135.468 20.9864 135.891 20.8112 136.202 20.4994C136.514 20.1877 136.689 19.7648 136.689 19.3239V12.0439C136.689 10.2431 135.974 8.51601 134.701 7.24264C133.427 5.96927 131.7 5.25389 129.899 5.25389C128.099 5.25389 126.371 5.96927 125.098 7.24264C123.825 8.51601 123.109 10.2431 123.109 12.0439V19.3239C123.109 19.7633 123.283 20.1848 123.593 20.4964C123.903 20.8079 124.324 20.9841 124.763 20.9864H125.017C125.466 20.987 125.899 20.8146 126.224 20.5051C126.55 20.1956 126.744 19.7727 126.767 19.3239L126.714 17.2501Z" fill="white"/>
<path d="M87.5407 18.6851V11.9564C87.4976 11.1303 87.1391 10.3522 86.5392 9.78269C85.9392 9.21318 85.1435 8.89566 84.3163 8.89566C83.4891 8.89566 82.6934 9.21318 82.0934 9.78269C81.4935 10.3522 81.135 11.1303 81.0919 11.9564V19.3239C81.0919 19.7648 80.9168 20.1877 80.605 20.4994C80.2932 20.8112 79.8704 20.9864 79.4294 20.9864H79.2282C78.7873 20.9864 78.3644 20.8112 78.0526 20.4994C77.7408 20.1877 77.5657 19.7648 77.5657 19.3239V12.0439C77.5703 10.2445 78.2872 8.52011 79.5595 7.24774C80.8319 5.97536 82.5563 5.2585 84.3557 5.25388C85.2985 5.25133 86.231 5.4498 87.091 5.83606C87.951 6.22232 88.7188 6.78748 89.3432 7.49388C89.9679 6.78792 90.7358 6.22306 91.5957 5.83684C92.4557 5.45061 93.388 5.25189 94.3307 5.25388C96.1301 5.2585 97.8545 5.97536 99.1268 7.24774C100.399 8.52011 101.116 10.2445 101.121 12.0439V24.6964C101.121 24.92 101.076 25.1415 100.991 25.348C100.905 25.5545 100.779 25.7421 100.62 25.8998C100.462 26.0575 100.274 26.1824 100.067 26.2672C99.8598 26.352 99.6381 26.395 99.4144 26.3939H99.2132C98.9895 26.395 98.7679 26.352 98.5609 26.2672C98.3539 26.1824 98.1658 26.0575 98.0072 25.8998C97.8487 25.7421 97.7228 25.5545 97.637 25.348C97.5511 25.1415 97.5069 24.92 97.5069 24.6964V11.9564C97.5081 11.539 97.4267 11.1254 97.2675 10.7395C97.1083 10.3536 96.8744 10.003 96.5792 9.70786C96.284 9.41269 95.9334 9.17878 95.5476 9.01956C95.1617 8.86035 94.7481 8.77898 94.3307 8.78013C93.491 8.7914 92.6887 9.12939 92.0941 9.72238C91.4994 10.3154 91.1593 11.1167 91.1457 11.9564V19.3239C91.1434 19.5445 91.0977 19.7625 91.0111 19.9655C90.9246 20.1684 90.7989 20.3524 90.6413 20.5067C90.4836 20.6611 90.2972 20.7829 90.0924 20.8652C89.8877 20.9475 89.6688 20.9887 89.4482 20.9864H89.2382C89.0172 20.9899 88.7978 20.9495 88.5926 20.8676C88.3873 20.7857 88.2004 20.664 88.0425 20.5093C87.8847 20.3547 87.759 20.1704 87.6729 19.9669C87.5868 19.7634 87.5418 19.5449 87.5407 19.3239V18.6851Z" fill="white"/>
<path d="M65.5169 5.00012C63.4428 5.06876 61.4766 5.94095 60.0336 7.43246C58.5906 8.92397 57.7839 10.918 57.7839 12.9932C57.7839 15.0685 58.5906 17.0625 60.0336 18.554C61.4766 20.0455 63.4428 20.9177 65.5169 20.9864C67.1159 20.9993 68.6801 20.5196 69.9969 19.6126C70.0669 19.9848 70.2658 20.3203 70.5586 20.5604C70.8515 20.8004 71.2196 20.9296 71.5982 20.9251H71.7994C72.2176 20.9301 72.6213 20.7721 72.925 20.4847C73.2288 20.1973 73.4088 19.8029 73.427 19.3851V19.3414V12.9976C73.4294 10.8909 72.5995 8.86856 71.1181 7.37074C69.6366 5.87291 67.6235 5.02089 65.5169 5.00012ZM67.2669 17.1626C66.4487 17.4885 65.5529 17.5674 64.6903 17.3897C63.8277 17.212 63.036 16.7853 62.4133 16.1626C61.7905 15.5398 61.3638 14.7481 61.1861 13.8855C61.0084 13.0229 61.0873 12.1271 61.4132 11.3089C61.6164 10.7349 61.9449 10.2133 62.3747 9.78198C62.8045 9.35066 63.3249 9.02039 63.8982 8.81512C64.7176 8.48976 65.6144 8.41142 66.4778 8.58979C67.3412 8.76816 68.1335 9.19542 68.757 9.81884C69.3804 10.4423 69.8077 11.2346 69.986 12.098C70.1644 12.9614 70.0861 13.8582 69.7607 14.6776C69.561 15.259 69.2332 15.788 68.8015 16.2257C68.3699 16.6634 67.8455 16.9986 67.2669 17.2064V17.1626Z" fill="white"/>
<path d="M7.38197 11.3614C5.32572 11.0114 4.29322 10.8451 4.37197 9.81263C4.45072 8.78013 6.00823 8.52638 6.95323 8.52638C7.89823 8.52638 9.27198 8.75387 9.72698 9.58512C9.88116 9.85218 10.1032 10.0738 10.3705 10.2274C10.6379 10.3811 10.9411 10.4613 11.2495 10.4601C11.4632 10.4695 11.6768 10.4367 11.8778 10.3634C12.0789 10.2902 12.2635 10.1781 12.4212 10.0334C12.5789 9.88873 12.7065 9.7144 12.7967 9.52037C12.8869 9.32633 12.938 9.11641 12.947 8.90262C12.9458 8.66523 12.8889 8.43144 12.7807 8.22012C12.7451 8.15281 12.7041 8.08844 12.6582 8.02762C11.7132 6.27762 9.67447 5.21887 7.04072 5.15762C3.43572 5.15762 0.915722 6.90763 0.766972 9.62013C0.425722 13.7501 5.32572 14.4326 6.89197 14.6951C8.95697 14.9489 10.077 15.3776 10.2432 16.0689C10.4182 17.1889 9.21072 17.6176 7.24197 17.6176C5.43072 17.6176 4.54697 17.0226 4.12697 16.4889C3.97223 16.3003 3.77709 16.1489 3.55597 16.0459C3.33484 15.9429 3.09339 15.891 2.84948 15.8939H2.51697C2.19865 15.8964 1.88753 15.9889 1.61949 16.1606C1.35145 16.3323 1.13741 16.5763 1.00204 16.8644C0.866669 17.1526 0.815483 17.4731 0.854397 17.789C0.893312 18.105 1.02074 18.4035 1.22198 18.6501C2.49073 20.1551 4.80072 20.9076 7.11072 20.9689C11.6607 20.9689 13.7257 18.6501 13.8132 16.3226C13.892 12.7351 10.4795 11.7901 7.38197 11.3614Z" fill="white"/>
</svg>
`;
    splash.appendChild(shinamon);
  };

  var hideSplash = function () {
    var splash = document.getElementById("application-splash-wrapper");
    splash.parentElement.removeChild(splash);
  };

  var setProgress = function (value) {
    var bar = document.getElementById("progress-bar");
    if (bar) {
      value = 100 - Math.min(1, Math.max(0, value)) * 100;
      bar.style.clipPath = `polygon(0 ${value}%, 100% ${value}%, 100% 100%, 0% 100%)`;
    }
  };

  var showCashing = function () {
    var wrapper = document.createElement("div");
    var first = document.createElement("div");
    var second = document.createElement("div");
    wrapper.id = "cash-message";
    first.id = "cash-first";
    second.id = "cash-second";
    document.body.appendChild(wrapper);
    wrapper.appendChild(first);
    wrapper.appendChild(second);
    first.innerText = `시나몬에 처음 오신 분이라면 시간이 조금 더 걸려요.`;
    second.innerText = `조금만 기다려 주세요!`;
  };
  var hideCash = function () {
    var splash = document.getElementById("cash-message");
    if (!splash) return;
    splash.parentElement.removeChild(splash);
  };

  var createCss = function () {
    var css = [
      "body {",
      "    background: linear-gradient(186.09deg, #5A39FF 0%, #0046FF 95.18%);",
      "}",
      "",
      "#cash-message {",
      "position: absolute;",
      "width: 100%;",
      "display: flex;",
      "flex-direction: column;",
      "align-items: center;",
      "bottom: 16px;",
      "left: 50%;",
      "color: #ffffff;",
      "font-size: 14px;",
      "line-height: 24px;",
      "transform: translateX(-50%)",
      "}",
      "#cash-second {",
      "font-weight: bold",
      "}",
      "#application-splash-wrapper {",
      "    position: absolute;",
      "    top: 0;",
      "    left: 0;",
      "    height: 100%;",
      "    width: 100%;",
      "    background: linear-gradient(186.09deg, #5A39FF 0%, #0046FF 95.18%);",
      "}",
      "",
      "#application-splash {",
      "    position: absolute;",
      "    top: calc(50% - 28px);",
      "    width: 264px;",
      "    left: calc(50% - 132px);",
      "}",
      "",
      "#logo {",
      "}",
      "#progress-bar-container {",
      "    margin: 20px auto 0 auto;",
      "    height: 2px;",
      "    width: 100%;",
      "    background-color: #1d292c;",
      "}",
      "",
      "#progress-bar{",
      "    width: 100%;",
      "    height: 100%;",
      "    overflow: hidden;",
      "    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);",
      "}",
      "",
      "@media (max-width: 480px) {",
      "    #application-splash {",
      "        width: 170px;",
      "        left: calc(50% - 85px);",
      "    }",
      "}",
    ].join("\n");

    var style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.head.appendChild(style);
  };

  createCss();
  showSplash();
  let timer = setTimeout(() => {
    showCashing();
  }, 1500);
  app.on("preload:end", function () {
    clearTimeout(timer);
    app.off("preload:progress");
    window.parent.postMessage(
      {
        type: "loaded",
      },
      "*"
    );
  });
  app.on("preload:progress", setProgress);
  app.on("start", hideSplash);
  app.on("start", hideCash);
});
