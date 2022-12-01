const loader = require('../add-location-loader/index.js');
function test(){
this.resourcePath='test/test.js';
    console.log(loader("<template>v-html=\"'<hello></hello>'\"</template>"));
}
test();
