var models = require('../models');
var User = models.user; 
var Blog = models.blog;
var Events = models.events;
var randomstring = require('randomstring');
// const map = require('promise-map');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport('smtps://bigbajar88@gmail.com:bigbajar@123@smtp.gmail.com')
);
var html_text = '<p><b>Thanks your blog sucessfully uploaded.</b></p>';
function send_mail(email){
  transporter.sendMail({
      from: 'bigbajar88@gmail.com',
      to: email,
      bcc: 'hemant_nagarkoti@yahoo.com',
      // bcc: 'shashidhar@teampumpkin.com',
      text: 'Authenticated with OAuth2',
      subject: '🐴BigBazar',
      html: html_text
    }, function(error, response) {
       if (error) {
            console.log('error while sending mail:- ',error);
       } else {
            console.log('E-Message sent');
       }
    });
}

var UserController = {};

UserController.getSignupPage = function(req, res){
	res.render('userLogin.html');
}

UserController.getProfile = function(req, res){
  Blog.findOne({
    where:{
      userId:  req.user.id
    }
  }).then(function(blogDetail){
    Events.findAll({
    }).then(function(events){
      var userInfo = {
        userInfo: req.user,
        blogDetail: blogDetail,
        events: events
      }
      return res.render('newprofile.html',{ userInfo: userInfo});
    })
        
  })
}

UserController.saveNameEmailProfile = function(req, res){
  console.log('name:---------------- ', req.body.name);
  console.log('email:-------------------------------- ', req.body.email);
    var user = User.update({
      name: req.body.name,
      email: req.body.email
    },{
      where: {
        id: req.user.id
      }
    }).then(function(val){
      console.log('val::::_------- ', val);
      console.log("user name and email updated Successfully");
      if(val){
        res.json({code: 200, data: "Successfully Updated"});
      }
      else{
        res.json({code: 0, data: "Technical Error. Please Try after some time."});
      }
      // res.redirect('/users/profile');
    })
}

UserController.saveProfile = function(req, res){

    var user = User.update({
      name: req.body.name,
      email: req.body.email
    },{
      where: {
        id: req.user.id
      }
    }).then(function(val){
      Blog.findOne({
        where:{
          userId:  req.user.id
        }
      }).then(function(blogDetail){
          if(!blogDetail){
            var url = req.body.blog_url;
            var UserId = req.user.id;
            console.log('iniside save profile');
            console.log('You need to upload your blogs first');
           res.json({code: 100, data:"You dont have any blogs saved. Please save it form home page."});
                  // var blog = Blog.build({
                  //   url: req.body.url,
                  //   userId: req.user.id
                  // });
                  // blog.save().then(function(blog){
                  //   if(!blog) return res.redirect('/users/home');
                  //      return User.update({
                  //         isBlogAdded: 1
                  //       },{
                  //         where: {
                  //           id: req.user.id
                  //         }
                  //       }).then(function(userData) {
                  //         return User.findOne({
                  //           where:{
                  //             id:UserId
                  //           }
                  //         }).then(function(userData){

                  //           var email = userData.email;
                  //            console.log('email',email);
                  //           send_mail(email);
                  //           return res.redirect('/users/profile') 
                  //         })
                          
                  //       })
                  // });
              
     }
          else{
            console.log('elseee part update user blog urls');
            Events.findOne({
                where: {
                  roundNo: 1
                }
              }).then(function(roundCheck1){
                console.log('roundCheck1: -- ', roundCheck1.roundBlocked);
                if(!roundCheck1.roundBlocked){
                  console.log('update round 1 blog url');
                  updateRound1Blog(req, res);
                }
                else{
                  console.log('Round 1 is already blocked you cannot change it');
                  Events.findOne({
                    where: {
                      roundNo: 2
                    }
                  }).then(function(roundCheck2){
                    console.log('roundCheck2:--- ', roundCheck2.roundBlocked);
                    if(!roundCheck2.roundBlocked){
                      console.log('Update round 2 blog url');
                      updateRound2Blog(req, res);
                    }else{
                        console.log('round 2 is also blocked');
                        Events.findOne({
                          where: {
                            roundNo: 3
                          }
                        }).then(function(roundCheck3){
                          console.log('Round Check 3:- ', roundCheck3.roundBlocked);
                          if(!roundCheck3.roundBlocked){
                            console.log('You can update round 3 blog');
                            updateRound3Blog(req, res);
                          }
                          else{
                            console.log('All rounds are blocked');
                            res.json({code: 100, data:"Winners are already Declared you cannot make changes now"});
                          }
                        })
                    }
                  })
                }
              })   
          }
      })
    })
}

function updateRound1Blog(req, res){
    Blog.update({
      url: req.body.url
    },{
      where:{
        userId: req.user.id
      }
    }).then(function(blog){
      console.log('Blog 1 url Successfully added');
      res.redirect('/users/profile');
    })
}

function updateRound2Blog(req, res){
    Blog.update({
      url1: req.body.url1
    },{
      where:{
        userId: req.user.id
      }
    }).then(function(blog){
      console.log('Blog 2 url Successfully added');
      res.redirect('/users/profile');
    })
}

function updateRound3Blog(req, res){
    Blog.update({
      url2: req.body.url2
    },{
      where:{
        userId: req.user.id
      }
    }).then(function(blog){
      console.log('Blog 3 url Successfully added');
      res.redirect('/users/profile');
    })
}


UserController.changePassword = function(req, res){
  
  var pass = User.generateHash(req.body.newPassword);

  if(req.body.confirmPassword !== req.body.newPassword){
    return req.flash('error', 'password doesnot match')
  }

      if(req.user.validPassword(req.body.currentPassword)){
        User.update({
          password: User.generateHash(req.body.newPassword)
        },{
          where:{
            email: req.user.email
          }
        }).then(function(user){
          return res.redirect('/users/profile');
        })
      }
      else{
        console.log('error');
        return req.flash('error', 'Technical error')
      }

}

UserController.postBlog = function(req,res){
  var url = req.body.blog_url;
  var UserId = req.user.id;  

  Events.findOne({
    where: {
      roundNo: 1
    }
  }).then(function(roundCheck1){
    console.log('roundCheck1: -- ', roundCheck1.roundBlocked);
    if(!roundCheck1.roundBlocked){
      console.log('update round 1');
      console.log('addRound1 fun');
      addRound1(UserId,url, req, res);
    }
    else{
      Events.findOne({
        where: {
          roundNo: 2
        }
      }).then(function(roundCheck2){
        console.log('roundCheck2:-- ', roundCheck2.roundBlocked);
        if(!roundCheck2.roundBlocked){
          console.log('update round 2');
          User.findOne({
            where: {
              id: UserId
            }
          }).then(function(response){
            console.log('response:- ', response.isUnder100);

            if(response.isUnder100){
              console.log('addRound2 fun');
              addRound2(UserId, url, req, res);
            }else{
              console.log('He is not eligible for top 100 round');
            }
          })
        }
        else{
          
          Events.findOne({
            where: {
              roundNo: 3
            }
          }).then(function(roundCheck3){
            if(!roundCheck3.roundBlocked){
              console.log('update round 3');
              User.findOne({
                where: {
                  id: UserId
                }
              }).then(function(response){
                console.log('response:- ', response.isUnder15);
                if(response.isUnder15){
                  console.log('addRound3 fun');
                  addRound3(UserId, url, req, res);
                }else{
                  console.log('He is not eligible for top 15 round');
                }
                  })
            }
            else{
              console.log('All rounds are completed');
              return res.json({code: 100, message: "All rounds are completed."});
            }
          })
        }
      })
    }
  })

  
};

function addRound1(UserId, url, req, res){
  console.log('updateRound1 fun');
  var UserId = UserId;
  var url = url;
  console.log('userId:-- ', UserId, ' url:- ', url);
  User.findOne({
        where: {
          id: UserId,
          // isBlogAdded: 1,
          isRound1BlogAdded: 1
        }
      }).then( function(blog){

          if(!blog){
            console.log('coominggg hereerre');
              var blog = Blog.build({
                url: req.body.blog_url,
                userId: req.user.id
              });
              blog.save().then(function(blog){
                console.log('Success:-- ', blog);
                if(!blog) return res.redirect('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound1BlogAdded: 1
                    },{
                      where: {
                        id: UserId
                      }
                    }).then(function(userData) {
                      console.log('User update done');
                      User.findOne({
                        where:{
                          id:UserId
                        }
                      }).then(function(userData){
                        var email = userData.email;
                        send_mail(email);
                      })
                      
                    })
                    .then(function(data){
                      console.log('sucessfully uploaded1');
                      return res.json({code: 200, message: "sucessfully uploaded"});
                      // return res.redirect('/users/home') 
                    });
              });
            }
          else if(blog.isRound1BlogAdded){
            console.log('ALready added');
            return res.json({code: 100, message: "Blog is already uploaded."});
          }
          else{
            console.log('Erorr111');
            return res.json({code: 0, message: "Error while uploading"});
          }
        })
}

function addRound2(UserId, url, req, res){
  console.log('updateRound2 fun');
  User.findOne({
        where: {
          id: UserId,
          // isBlogAdded: 1,
          isRound2BlogAdded: 1
        }
      }).then( function(blog){
          if(!blog){
            console.log('coming 123');
              // var blog = Blog.build({
              //   url1: req.body.blog_url,
              //   userId: req.user.id
              // });
              // blog.save()
              Blog.update({
                url1: req.body.blog_url
              },{
                where: {
                  userId: UserId
                }
              })
              .then(function(blog){
                console.log('blog:------------- ',blog);

                if(!blog) return res.redirect('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound2BlogAdded: 1
                    },{
                      where: {
                        id: req.user.id
                      }
                    }).then(function(userData) {
                      User.findOne({
                        where:{
                          id:UserId
                        }
                      }).then(function(userData){
                        var email = userData.email;
                        send_mail(email);
                      })
                      
                    }).then(function(data){
                      console.log('sucessfully uploaded2');
                      return res.json({code: 200, message: "sucessfully uploaded"});
                      // return res.redirect('/users/home') 
                    });
              });
            }
          else if(blog.isRound2BlogAdded){
            console.log('ALready added');
            return res.json({code: 100, message: "Blog is already uploaded."});
          }
          else{
            return res.json({code: 0, message: "Error while uploading"});
          }
        })
}


function addRound3(UserId, url, req, res){
  console.log('updateRound3 fun');
  User.findOne({
        where: {
          id: UserId,
          // isBlogAdded: 1,
          isRound3BlogAdded: 1
        }
      }).then( function(blog){
          if(!blog){
            console.log('coming here1');
              // var blog = Blog.build({
              //   url3: req.body.blog_url,
              //   userId: req.user.id
              // });
              // blog.save()
              Blog.update({
                url2: req.body.blog_url
              },{
                where: {
                  userId: UserId
                }
              })
              .then(function(blog){
                if(!blog) return res.redirect('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound3BlogAdded: 1
                    },{
                      where: {
                        id: req.user.id
                      }
                    }).then(function(userData) {
                      User.findOne({
                        where:{
                          id:UserId
                        }
                      }).then(function(userData){
                        var email = userData.email;
                        send_mail(email);
                      })
                      
                    }).then(function(data){
                      console.log('coming sucessfully');
                      return res.json({code: 200, message: "sucessfully uploaded"});
                      // return res.redirect('/users/home') 
                    });
              });
            }
          else if(blog.isRound3BlogAdded){
            console.log('ALready added1');
            return res.json({code: 100, message: "Blog is already uploaded."});
          }
          else{
            console.log('error1');
            return res.json({code: 0, message: "Error while uploading"});
          }
        })
}

UserController.getAdminSignupPage = function(req, res){
  res.render('adminPanel1/signup.html');
}

UserController.getAllBlogs = function(req, res){
    Blog.findAll({include:[{ model: models.user }]}).then(function(allblogs) {
      console.log('allblogs:- ',allblogs.length);
    res.render('adminPanel1/index.html', {blogs: allblogs});
  });
}

UserController.postSelectFor100 = function(req, res){
var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder100: 1
     }
  })
  .then(function(result) {
    if(result >= 100){
      console.log('Already selectFor100 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder100: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor100 ',user);
              if(user){
                return res.json({ code: 200 });
              }
              else{
                res.json({ code: 0 });
              }
              
           })
    }
  });
}

UserController.unselectFor100 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder100: 0,
            isUnder15: 0,
            isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor100 ',user);
              if(user){
                res.json({ code: 200 })
              }
              else{
                res.json({ code: 0 })
              }
              
           })
}

UserController.postSelectFor15 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder15: 1
     }
  })
  .then(function(result) {
    console.log(result);
    if(result >= 100){
      console.log('Already selectFor15 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder15: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor15 ',user);
              if(user){
                res.json({ code: 200 });
              }
              else{
                res.json({ code: 0 });
              }
              
           })
    }
  });
}

UserController.unselectFor15 = function(req, res){
 
var arr = JSON.parse(req.body.userIds);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder15: 0,
              isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor100 ',user);
              if(user){
                res.json({ code: 200 })
              }
              else{
                res.json({ code: 0 })
              }
              
           })
};


UserController.postSelectFor3 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder3: 1
     }
  })
  .then(function(result) {
    console.log(result);
    if(result >= 100){
      console.log('Already selectFor3 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder3: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor3 ',user);
              if(user){
                res.json({ code: 200 })
              }
              else{
                res.json({ code: 0 })
              }
           })
    }
  });
}



UserController.unselectFor3 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  console.log('insied:-- ',arr);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor15 ',user);
              if(user){
                res.json({ code: 200 })
              }
              else{
                res.json({ code: 0 })
              }
           })
}

UserController.getListOfAllUsers = function(req, res){
  console.log('coming getListOfAllUsers');

  User.findAll({include:[{ model: models.blog }]}).then(function(allUsers) {
    console.log('a::---------000- %j', allUsers[0]);
    console.log('a::---------1111- %j', allUsers[1]);
      console.log('----------------------------------------',allUsers[0].blogs.url);
      // res.render('users.html', {allUsers: allUsers});
      return res.render('users.html', {allUsers: allUsers});
  });


  // Blog.findAll({include:[{ model: models.user }]})
  // .then(function(allblogs) {
  //   res.render('users.html', {blogs: allblogs});
  // })
}
module.exports = UserController;