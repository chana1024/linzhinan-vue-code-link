const loader = require('../add-location-loader/index.js');
function test(){
this.resourcePath='test/test.js';
    console.log(loader(`<template><a>"</a>v-html="'<hello>"
                        <div class="test">test</div>
                       </template>
        `));
    // let a =/(<[\w-]+)|(<\/template)|(v-html=\s?")|([^\\=]")/g
    // console.log((`>"`).match(a));
}
test();
