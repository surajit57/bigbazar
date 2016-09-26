var models = require('../models');
var User = models.user;
var Blog = models.blog;
var Events = models.events;
var randomstring = require('randomstring');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
// const map = require('promise-map');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport('smtps://cheers@fbbblogstar.in:star@6204@smtp.gmail.com')
);

var html_text = '<p><b>Thanks your blog sucessfully uploaded.</b></p>';
function send_mail(email){
  transporter.sendMail({
      from: 'cheers@fbbblogstar.in',
      to: email,
      bcc: 'shashidhar@teampumpkin.com',
      text: 'Authenticated with OAuth2',
      subject: 'fbb',
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

UserController.forgotPassword = function(req, res){
  console.log('forgot pass', req.body.email);
  res.render('forgot.html', {
    user: req.user
  });
}

UserController.retrievePassword = function(req, res, next){
  // console.log('post request for reset pass');
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        console.log('first token:- ', token);
        done(err, token);
      });
    },
    function(token, done) {
      console.log('coming here', token);
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user){
        if(user){
          var err = null;
          console.log('users found:--- ', user.id, 'email:- ', user.email);

          User.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000 // 1 hour
          },{
            where: {
              id: user.id
            }
          }).then(function(userData) {
              done(err, token, user);
          })
        }else{
          req.flash('error', 'No account with that email address exists.');
          return res.siteRediret('/users/login');
        }
      })
    },
    function(token, user, done) {
      console.log('');

      console.log('email to be setn:-- ', user.email, 'headers:-- ',req.headers.host, 'token:-- ', token);
      transporter.sendMail({
          from: 'cheers@fbbblogstar.in',
          to: user.email,
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://www.fbbindia.in/blogstar/users/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          subject: 'BigBazaar Reset Password Link'
          // html: html_text
        }, function(error, response) {
           if (error) {
                console.log('error while sending mail:- ',error);
                // res.siteRediret
                req.flash('error', 'Technical problem while sending mail. Please try after some time.');
          			return res.render('newuserLogin.html',{});
           } else {
                console.log('E-Message sent');
                req.flash('info', 'Email Successfully send to your mail id.');
          			return res.render('newuserLogin.html',{});
           }
        });
    }
  ], function(err) {
    console.log('err fun');
    if (err) return next(err);
    res.siteRediret('/users/forgot');
  });
}


UserController.resetPassword = function(req, res){
  async.waterfall([
    function(done) {
      User.findOne({
         where : {
           resetPasswordToken: req.params.token,
           resetPasswordExpires: { $gt: Date.now() }
         }
       }).then(function(user){
         if(user){
           var err = null;
           var pass = User.generateHash(req.body.password);

           if(req.body.confirmPassword !== req.body.password){
             return res.json({code: 100, message:"New Password and Confirm Password fields doesnot matched."});
             // return req.flash('error', 'password doesnot match')
           }
           User.update({
             password: User.generateHash(req.body.password),
             resetPasswordToken: undefined,
             resetPasswordExpires: undefined
           },{
             where: {
               id: user.id
             }
           }).then(function(userData) {
             console.log('usesr password changed:-- ', userData);
              //  res.siteRediret('/users/login');
              // return true;
              done(err, user);
           })
         }else{
           req.flash('error', 'No account with that email address exists.');
           console.log('first else');
           return res.siteRediret('/users/login');
         }
       })
    },
    function(user, done) {
      console.log('send password changed mail', user);
      transporter.sendMail({
          from: 'cheers@fbbblogstar.in',
          to: user.email,
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n',
          subject: 'Your password has been changed',
          // html: html_text
        }, function(error, response) {
           if (error) {
                console.log('error while sending mail:- ',error);
                // req.flash('info', 'Error! Your password has been changed.');
           } else {
                console.log('E-Message sent');
                req.flash('info', 'Success! Your password has been changed.');
                // res.render('newuserLogin.html');
                res.siteRediret('/users/login');
           }
        });

    }
  ], function(err) {
    console.log('Last error');
    res.siteRediret('/');
  });
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
  // console.log('name:---------------- ', req.body.name);
  // console.log('email:-------------------------------- ', req.body.email);
  console.log('age:--------------- ', req.body);
    var user = User.update({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      city: req.body.city,
      phone: req.body.phone,
      hobbies: req.body.hobbies || "",
      bio: req.body.bio || "",
      faceBook_url: req.body.faceBook_url || " ",
      twitter_url: req.body.twitter_url || " ",
      instagram_url: req.body.instagram_url || " ",
      youtube_url: req.body.youtube_url || " ",
      snapchat_url: req.body.snapchat_url || " "
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
      // res.siteRediret('/users/profile');
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
                  //   if(!blog) return res.siteRediret('/users/home');
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
                  //           return res.siteRediret('/users/profile')
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
      res.siteRediret('/users/profile');
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
      res.siteRediret('/users/profile');
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
      res.siteRediret('/users/profile');
    })
}


UserController.changePassword = function(req, res){

  var pass = User.generateHash(req.body.newPassword);

  if(req.body.confirmPassword !== req.body.newPassword){
    return res.json({code: 100, message:"New Password and Confirm Password fields doesnot matched."});
    // return req.flash('error', 'password doesnot match')
  }

      if(req.user.validPassword(req.body.currentPassword)){
        User.update({
          password: User.generateHash(req.body.newPassword)
        },{
          where:{
            email: req.user.email
          }
        }).then(function(user){
          if(user){
            return res.json({code:200, message:"Password Changed Successfully."})
          }
          else{
            return res.json({code:0, message: "Technical Error. Please try after some time."})
          }
        })
      }
      else{
        console.log('error');
        // return req.flash('error', 'Technical error')
        res.json({code: 100, message:"Current input password is wrong."});
      }

}

UserController.postBlog = function(req,res){
  var url = req.body.blog_url;
  var UserId = req.user.id;
  var user_age = req.body.age;
  var user_city = req.body.city;
  var user_name = req.body.Blogusername;
  var user_phone = req.body.phone;
  var blog_email = req.body.email;
  var blog_title = req.body.blog_title;
  var blog_desc = req.body.blog_desc;

  Events.findOne({
    where: {
      roundNo: 1
    }
  }).then(function(roundCheck1){
    console.log('Check:------------------------------- ', roundCheck1);
    console.log('roundCheck1: -- ', roundCheck1.roundBlocked);
    if(!roundCheck1.roundBlocked){
      console.log('update round 1');
      console.log('addRound1 fun');
      addRound1(UserId,url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc);
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
              addRound2(UserId, url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc);
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
                  addRound3(UserId, url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc);
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

function addRound1(UserId, url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc){
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
                userId: req.user.id,
                blog_title: blog_title,
                blog_desc: blog_desc
              });
              blog.save().then(function(blog){
                console.log('Success:-- ', blog);
                if(!blog) return res.siteRediret('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound1BlogAdded: 1,
                      age: user_age,
                      city: user_city,
                      phone: user_phone,
                      blogEmail: blog_email,
                      blogUserName: user_name
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
                      // return res.siteRediret('/users/home')
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

function addRound2(UserId, url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc){
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
                url1: req.body.blog_url,
                blog_title: blog_title,
                blog_desc: blog_desc
              },{
                where: {
                  userId: UserId
                }
              })
              .then(function(blog){
                console.log('blog:------------- ',blog);

                if(!blog) return res.siteRediret('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound2BlogAdded: 1,
                      age: user_age,
                      city: user_city,
                      phone: user_phone,
                      blogEmail: blog_email,
                      blogUserName: user_name
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
                      // return res.siteRediret('/users/home')
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


function addRound3(UserId, url, req, res, user_age, user_city, user_phone, blog_email, user_name, blog_title, blog_desc){
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
                url2: req.body.blog_url,
                age: user_age,
                city: user_city,
                phone: user_phone,
                blogEmail: blog_email,
                blogUserName: user_name
              },{
                where: {
                  userId: UserId
                }
              })
              .then(function(blog){
                if(!blog) return res.siteRediret('/users/home');
                    console.log('blog created');
                    User.update({
                      isRound3BlogAdded: 1,
                      blog_title: blog_title,
                      blog_desc: blog_desc
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
                      // return res.siteRediret('/users/home')
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
    // console.log('a::---------1111- %j', allUsers[1]);
    //   console.log('----------------------------------------',allUsers[0].blogs.url);
      // res.render('users.html', {allUsers: allUsers});
      // return res.render('users.html', {allUsers: allUsers});

      Events.findAll({}).then(function(events){
        console.log('events:---- %j',events);
        // allUsers.push(events);
        return res.render('users.html', {allUsers: allUsers, events: events});
      })


  });


  // Blog.findAll({include:[{ model: models.user }]})
  // .then(function(allblogs) {
  //   res.render('users.html', {blogs: allblogs});
  // })
}
module.exports = UserController;
