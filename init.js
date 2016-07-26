var models = require('./models');
global.uu = {};
function save (){ uu.data = arguments ; } 


Object.keys( models).forEach( function( modelName){
global[modelName] = models[modelName];
});
