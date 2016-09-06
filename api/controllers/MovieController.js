module.exports = {
    save: function(req, res) {
        if (req.body) {
            Movie.saveData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    delete: function(req, res) {
        if (req.body) {
            Movie.deleteData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    find: function(req, res) {
        if (req.body) {
            Movie.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getAllTest: function(req, res) {
        if (req.body) {
            Movie.getAllTest(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    findOne: function(req, res) {
        if (req.body) {
            Movie.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getOneMovie: function(req, res) {
        if (req.body) {
            Movie.getOneMovie(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    findLimited: function(req, res) {
        if (req.body) {
            if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
                Movie.findLimited(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide parameters"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },


    // cast

    findCast: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllCast(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneCast: function(req, res) {
        if (req.body) {
            Movie.getOneCast(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteCast: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteCast(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveCast: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveCast(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },



    // crew

    findCrew: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllCrew(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneCrew: function(req, res) {
        if (req.body) {
            Movie.getOneCrew(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteCrew: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteCrew(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveCrew: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveCrew(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },


    // gallery

    findGallery: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllGallery(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneGallery: function(req, res) {
        if (req.body) {
            Movie.getOneGallery(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteGallery: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteGallery(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveGallery: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveGallery(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },




    // Videos

    findVideos: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllVideos(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneVideos: function(req, res) {
        if (req.body) {
            Movie.getOneVideos(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteVideos: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteVideos(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveVideos: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveVideos(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },


    // Wallpaper

    findWallpaper: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllWallpaper(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneWallpaper: function(req, res) {
        if (req.body) {
            Movie.getOneWallpaper(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteWallpaper: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteWallpaper(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveWallpaper: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveWallpaper(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },


    // Awards

    findAwards: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllAwards(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneAwards: function(req, res) {
        if (req.body) {
            Movie.getOneAwards(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteAwards: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteAwards(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        }
    },

    saveAwards: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveAwards(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },


    getAllMovies: function(req, res) {
        if (req.body) {
            Movie.getAllMovies(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },

    saveDataMovie: function(req, res) {
        if (req.body) {
            Movie.saveDataMovie(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieDetails: function(req, res) {
        if (req.body) {

            Movie.getMovieDetails(req.body, function(err, data) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: data
                    });
                }
            });

        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },




    // Conflict aya so replaced behind the scenes


    // Behind the scenes

    findBehindTheScenes: function(req, res) {
        if (req.body.pagenumber && req.body.pagesize) {
            Movie.getAllBehindTheScenes(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    findOneBehindTheScenes: function(req, res) {
        if (req.body) {
            Movie.getOneBehindTheScenes(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteBehindTheScenes: function(req, res) {
        if (req.body) {
            if (req.body._id && req.body._id !== "") {
                //	console.log("not valid");
                Movie.deleteBehindTheScenes(req.body, function(err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    saveBehindTheScenes: function(req, res) {
        console.log(req.body);
        if (req.body) {
            Movie.saveBehindTheScenes(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },

    getAllUpcomingMovies: function(req, res) {
        if (req.body) {
            Movie.getAllUpcomingMovies(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getAllRecentMovies: function(req, res) {
        if (req.body) {
            Movie.getAllRecentMovies(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },

    getMovieNews: function(req, res) {
        if (req.body) {
            Movie.getMovieNews(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieGal: function(req, res) {
        if (req.body) {
            Movie.getMovieGal(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getOneMovie: function(req, res) {
        if (req.body) {
            Movie.getOneMovie(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },


    getMovieBehindTheScenes: function(req, res) {
        if (req.body) {
            Movie.getMovieBehindTheScenes(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieVideo: function(req, res) {
        if (req.body) {
            Movie.getMovieVideo(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieWallpaper: function(req, res) {
        if (req.body) {
            Movie.getMovieWallpaper(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieAwards: function(req, res) {
        if (req.body) {
            Movie.getMovieAwards(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieSynopsisAndNote: function(req, res) {
        if (req.body) {
            Movie.getMovieSynopsisAndNote(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieCast: function(req, res) {
        if (req.body) {
            Movie.getMovieCast(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieCast: function(req, res) {
        if (req.body) {
            Movie.getMovieCast(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getMovieCrew: function(req, res) {
        if (req.body) {
            Movie.getMovieCrew(req.body, function(err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getAllMovieName: function(req, res) {
        if (req.body) {
            Movie.getAllMovieName(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },



    // get all search param

    findAllSearchParam: function(req, res) {
        Movie.findAllSearchParam(req.body, function(err, respo) {
            if (err) {
                res.json({
                    value: false,
                    data: err
                });
            } else {
                res.json({
                    value: true,
                    data: respo
                });
            }
        });
    }
};
