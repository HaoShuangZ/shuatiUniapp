"use strict";const t=require("../common/vendor.js"),r=()=>{const{statusBarHeight:n,platform:o}=t.index.getSystemInfoSync(),{top:a=0,height:e=0}=t.index.getMenuButtonBoundingClientRect();if(t.wx$1.setStorageSync("statusBarHeight",n),t.wx$1.setStorageSync("menuButtonHeight",e||32),a&&a!==0&&e&&e!==0){const i=(a-n)*2+e;t.wx$1.setStorageSync("navigationBarHeight",i)}else t.wx$1.setStorageSync("navigationBarHeight",o==="android"?48:40)};function g(n){var o=/^[1]([3-9])[0-9]{9}$/;return o.test(n)}exports.checkPhoneNumber=g;exports.getNavBarHieht=r;
