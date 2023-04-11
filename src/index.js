// import $ from 'jquery';
// const $ = require('jquery');
import './style.scss';

// $('#main').html('Here we go!');

let cnt = 0;
const main = document.querySelector('#main');

setInterval(() => {
  cnt += 1;
  main.textContent = `You've been on this page for ${cnt} seconds.`;
}, 1000);
