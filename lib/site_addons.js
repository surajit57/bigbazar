
var config = require('../config');

function setupCutomRedirect( app ){
  app.response.siteRediret = function( path ){
    console.log('new path:_--- ----------- ', path, 'config.siteRoot:-------- ', config.siteRoot);
    if(config.localsiteRoot == "/"){
      console.log('localsiteRoot:- ', config.localsiteRoot);
      this.redirect( path );
    }else{
      console.log('siteRoot:- ', config.siteRoot);
      this.redirect( config.siteRoot + path );
    }
  };
}

module.exports = {
  setupCutomRedirect: setupCutomRedirect
};
