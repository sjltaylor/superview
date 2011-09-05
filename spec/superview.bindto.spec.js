describe("bind layout behaviour", function () {
  
  var view, otherView;

  beforeEach(function () {
    view = new Superview;
    otherView = new Superview;

    view.z().css('borderWidth', 10);
  });
  
  describe("bindTo()", function () {
    it ('should be chainable', function () {
      var rtn = view.bindTo(otherView, {});
      expect(rtn).toBe(view);
    });
    it ("should set the initial position of view based on the binding to otherView", function() {
      view.bindTo(otherView, {
        top: function () { return 6 },
        width: function () { return 23 }
      });
    
      var r = view.outerRect()
    
      expect(r.width).toEqual(23);
      expect(r.top).toEqual(6);
    })    
    it ('should unbind any current binding before making a new binding', function() {
      view.bindTo(otherView, {});
      spyOn(view, 'unbind');
      view.bindTo(new Superview(), {});
      expect(view.unbind).toHaveBeenCalled();
    })
  
    describe("binding to the width of the other view", function () {
      it ("should not throw an error if the height binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.resize({width: 123, height: 456});
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                width: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                width: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            width: '+123'
          })
          otherView.outerResize({width: 200})
          expect(view.outerRect().width).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            width: '-46'
          })
          otherView.outerResize({width: 200})
          expect(view.outerRect().width).toBe(154);
        })
      })
      describe("with true indicating match the view outer width with the otherView width", function () {
        it('should match the OUTER width of the bound view to the inner width of the otherView', function () {
        
          view.bindTo(otherView, {
            width: true
          });
        
          var s;
        
          spyOn(view, 'outerResize').andCallFake(function (_s) {
            s = _s;
          })
        
          otherView.resize({width: 123, height: 456});
        
          expect(view.outerResize).toHaveBeenCalled();
          expect(s.width).toEqual(123);    
        });
        it('should match the outer width of the bound view to the outer width of the otherView', function () {
        
          view.bindTo(otherView, {
            width: true
          });
        
          otherView.outerResize({width: 123, height: 456});
          
          expect(view.outerRect().width).toBe(123);   
        });      
      });
      describe("with a function which should return the view outer width", function () {
        it('should call the function with (otherView, otherRect, otherOuterRect) to get the OUTER width of the bound view', function () {
        
          var v, otherRect, otherOuterRect;
        
          view.bindTo(otherView, {
            width: function (a, b, c) {
             v = a;
             otherRect = b;
             otherOuterRect = c;
             return 0.5 * b.width; 
            }
          });
        
          var s;
        
          spyOn(view, 'outerResize').andCallFake(function (_s) {
            s = _s;
          })
        
          otherView.resize({width: 222, height: 456});
        
          expect(view.outerResize).toHaveBeenCalled();
          expect(s.width).toEqual(111);   
        });
      })
      describe("with number representing a fraction of the other view width", function () {
        it("should set the view outer width to a fraction fo the otherView width", function () {
          view.bindTo(otherView, {
            width: 1.8
          });
          otherView.resize({width: 100, height: 2});
          expect(view.outerRect().width).toEqual(180);
        })
      })
    });
    describe("binding to the height of the other view", function () {
      it ("should not throw an error if the height binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.resize({width: 123, height: 456});
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                height: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                height: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            height: '+123'
          })
          otherView.outerResize({height: 200})
          expect(view.outerRect().height).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            height: '-46'
          })
          otherView.outerResize({height: 200})
          expect(view.outerRect().height).toBe(154);
        })
      })
      
      describe("with true indicating match the view outer height with the otherView height", function () {
        it('should match the OUTER height of the bound view to the inner height of the otherView', function () {
        
          view.bindTo(otherView, {
            height: true
          });
        
          var s;
        
          spyOn(view, 'outerResize').andCallFake(function (_s) {
            s = _s;
          })
        
          otherView.resize({width: 123, height: 456});
        
          expect(view.outerResize).toHaveBeenCalled();
          expect(s.height).toEqual(456);    
        });      
      });
      describe("with a function which should return the view outer height", function () {
        it('should call the function with (otherView, otherRect, otherOuterRect) to get the OUTER height of the bound view', function () {
        
          var v, otherRect, otherOuterRect;
        
          view.bindTo(otherView, {
            height: function (a, b, c) {
             v = a;
             otherRect = b;
             otherOuterRect = c;
             return 0.5 * b.height; 
            }
          });
        
          var s;
        
          spyOn(view, 'outerResize').andCallFake(function (_s) {
            s = _s;
          })
        
          otherView.resize({width: 222, height: 650});
        
          expect(view.outerResize).toHaveBeenCalled();
          expect(s.height).toEqual(325);   
        });
      })
      describe("with number representing a fraction of the other view height", function () {
        it("should set the view outer height to a fraction fo the otherView height", function () {
          view.bindTo(otherView, {
            height: 1.8
          });
          otherView.resize({width: 100, height: 200});
          expect(view.outerRect().height).toEqual(360);
        })
      })
    });
    describe("binding the top of the view", function () {
      it ("should not throw an error if the top binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.outerMoveTo({top: 123, left: 456});
      });
      describe("with true", function () {
        it('should bind to the top of the otherView', function () {
          view.bindTo(otherView, {
            top: true
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().top).toEqual(101);
        });
      });
      describe('with "top"', function() {
        it ('should bind to the top of the other view', function () {
          view.bindTo(otherView, {
            top: 'top'
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().top).toEqual(101);
        });
      })
      describe("with 'bottom'", function () {
        it("should bind to the bottom of the other view", function () {
          view.bindTo(otherView, {
            top: 'bottom'
          });
        
          otherView.outerResize({width: 200, height: 300});
          otherView.outerMoveTo({top: 101, left: 202});
        
          expect(view.outerRect().top).toEqual(401);
        });
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                top: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                top: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            top: '+123'
          })
          otherView.moveTo({top: 200})
          expect(view.outerRect().top).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            top: '-46'
          })
          otherView.outerMoveTo({top: 200})
          expect(view.outerRect().top).toBe(154);
        })
      })
      describe("with a number", function () {
        it("should bind the top of the view to the number multiplied by the height of the other view", function () {
          view.bindTo(otherView, {
            top: 0.2
          });
        
          otherView.resize({width: 1005, height: 1000});
          //otherView.outerMoveTo({top: 10, left: 202});
        
          expect(view.outerRect().top).toEqual(200);
        });
      });
      describe('with a function', function () {
        it ('should set the outer top position of the view to the value returned by the function', function () {
          view.bindTo(otherView, {
            top: function (other, oRect, oOuterRect) {
              return 5134;
            }
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().top).toEqual(5134);
        });
        it('should pass the otherView, otherViewRect and otherViewOuterRect to the function when bindingToOuterRect', function () {
          var rect = {}
          var outerRect = {}
          spyOn(otherView, 'outerRect').andReturn(outerRect);
          spyOn(otherView, 'rect').andReturn(rect);
          
          view.bindTo(otherView, {
            top: function (o, or, oor) {
              expect(o).toBe(otherView)
              expect(or).toBe(rect)
              expect(oor).toBe(outerRect)
            }
          })
        })
      })
    });
    describe("binding the bottom of the view", function () {
      it ("should not throw an error if the bottom binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.outerMoveTo({top: 123, left: 456});
      });
      describe("with true", function () {
        it('should bind to the top of the otherView', function () {
          view.bindTo(otherView, {
            bottom: true
          });
        
          otherView.resize({width: 100, height: 300});
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().bottom).toEqual(401);
        });
      });
      describe('with "bottom"', function(){
        it ('should bind to the bottom of the other view', function () {
          view.bindTo(otherView, {
            bottom: 'bottom'
          });
        
          otherView.resize({width: 100, height: 300});
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().bottom).toEqual(401);
        });
      })
      describe("with 'top'", function () {
        it("should bind to the bottom of the other view", function () {
          view.bindTo(otherView, {
            bottom: 'top'
          });
          view.outerResize({width: 200, height: 300});
          otherView.outerMoveTo({top: 101, left: 202});
        
          expect(view.outerRect().bottom).toEqual(101);
        });
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                bottom: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                bottom: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            bottom: '+123'
          })
          otherView.moveTo({bottom: 200})
          expect(view.outerRect().bottom).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            bottom: '-46'
          })
          otherView.outerMoveTo({bottom: 200})
          expect(view.outerRect().bottom).toBe(154);
        })
      })
      describe("with a number", function () {
        it("should bind the bottom of the view to the number multiplied by the height of the other view", function () {
          view.bindTo(otherView, {
            bottom: 0.2
          });
        
          otherView.resize({width: 1005, height: 1000});
          otherView.outerMoveTo({top: 106, left: 202});
        
          expect(view.outerRect().bottom).toEqual(0.2*1000);
        });
      });
      describe('with a function', function () {
        it ('should set the outer bottom position of the view to the value returned by the function', function () {
          view.bindTo(otherView, {
            bottom: function (other, oRect, oOuterRect) {
              return 6543;
            }
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().bottom).toEqual(6543);
        });
        
        it('should pass the otherView, otherViewRect and otherViewOuterRect to the function when bindingToOuterRect', function () {
          var rect = {}
          var outerRect = {}
          spyOn(otherView, 'outerRect').andReturn(outerRect);
          spyOn(otherView, 'rect').andReturn(rect);
          
          view.bindTo(otherView, {
            bottom: function (o, or, oor) {
              expect(o).toBe(otherView)
              expect(or).toBe(rect)
              expect(oor).toBe(outerRect)
            }
          })
        })
      })
    });
    describe("binding the left of the view", function () {
      it ("should not throw an error if the left binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.outerMoveTo({top: 123, left: 456});
      });
      describe("with true", function () {
        it('should bind to the left of the otherView', function () {
          view.bindTo(otherView, {
            left: true
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().left).toEqual(202);
        });
      });
      describe('with "left"', function(){
        it ('should bind to the top of the other view', function () {
          view.bindTo(otherView, {
            left: 'left'
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().left).toEqual(202);
        });
      })
      describe("with 'right'", function () {
        it("should bind to the right of the other view", function () {
          view.bindTo(otherView, {
            left: 'right'
          });
          view.outerResize({width: 200, height: 300});
          otherView.outerMoveTo({top: 101, left: 209});
        
          expect(view.outerRect().right).toEqual(409);
        });
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                left: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                left: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            left: '+123'
          })
          otherView.moveTo({left: 200})
          expect(view.outerRect().left).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            left: '-46'
          })
          otherView.outerMoveTo({left: 200})
          expect(view.outerRect().left).toBe(154);
        })
      })
      describe("with a number", function () {
        it("should bind the left of the view to the number multiplied by the width of the other view", function () {
          view.bindTo(otherView, {
            left: 0.2
          });
        
          otherView.resize({width: 1000, height: 1005});
        
          expect(view.outerRect().left).toEqual(200);
        });
      });
      describe('with a function', function () {
        it ('should set the outer left position of the view to the value returned by the function', function () {
          view.bindTo(otherView, {
            left: function (other, oRect, oOuterRect) {
              return 5134;
            }
          });
        
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().left).toEqual(5134);
        });
        
        it('should pass the otherView, otherViewRect and otherViewOuterRect to the function when bindingToOuterRect', function () {
          var rect = {}
          var outerRect = {}
          spyOn(otherView, 'outerRect').andReturn(outerRect);
          spyOn(otherView, 'rect').andReturn(rect);
          
          view.bindTo(otherView, {
            left: function (o, or, oor) {
              expect(o).toBe(otherView)
              expect(or).toBe(rect)
              expect(oor).toBe(outerRect)
            }
          })
        })
      })
    }); 
    describe("binding the right of the view", function () {
      it ("should not throw an error if the right binding is undefined", function () {
        view.bindTo(otherView, {});
        otherView.outerMoveTo({top: 123, left: 456});
      });
      describe("with true", function () {
        it('should bind to the right of the otherView', function () {
          view.bindTo(otherView, {
            right: true
          });
        
          otherView.resize({width: 300});
          otherView.moveTo({top: 101, left: 202});        
        
          expect(view.outerRect().right).toEqual(502);
        });
      });
      describe('with "left"', function(){
        it ('should bind the right edge of the view to the left edge of the other view', function () {
          view.bindTo(otherView, {
            right: 'left'
          });
        
          otherView.outerResize({width: 80, height: 90});
          otherView.moveTo({top: 101, left: 313});
        
          expect(view.outerRect().right).toEqual(313);
        });
      })
      describe("with 'right'", function () {
        it("should bind to the right of the other view", function () {
          view.bindTo(otherView, {
            right: true
          });
        
          otherView.resize({width: 300});
          otherView.moveTo({top: 101, left: 202});        
        
          expect(view.outerRect().right).toEqual(502);
        });
      });
      describe('with an offset described as a string', function () {
        describe ('invalid offsets', function () {
          it('should throw an error if it does not start with +/-', function () {
            var fn = function () {
              view.bindTo(otherView, {
                right: "23"
              });
            }
            expect(fn).toThrowAnError();
          })
          it('should throw an error if it does not end with a number', function () {
            var fn = function () {
              view.bindTo(otherView, {
                right: "+23meow"
              });
            }
            expect(fn).toThrowAnError();
          })
        })
        it('should bind positive offsets correctly', function() {
          view.bindTo(otherView, {
            right: '+123'
          })
          otherView.moveTo({right: 200})
          expect(view.outerRect().right).toBe(323);
        })
        it('should bind negative offsets correctly', function () {
          view.bindTo(otherView, {
            right: '-46'
          })
          otherView.outerMoveTo({right: 200})
          expect(view.outerRect().right).toBe(154);
        })
      })
      describe("with a number", function () {
        it("should bind the right of the view to the number multiplied by the width of the other view", function () {
          view.bindTo(otherView, {
            right: 0.6
          });
        
          otherView.resize({width: 1000, height: 1005});
        
          expect(view.outerRect().right).toEqual(600);
        });
      });
      describe('with a function', function () {
        it ('should set the outer right position of the view to the value returned by the function', function () {
          view.bindTo(otherView, {
            right: function (other, oRect, oOuterRect) {
              return 1024;
            }
          });
        
          otherView.resize({width: 13});
          otherView.moveTo({top: 101, left: 202});
        
          expect(view.outerRect().right).toEqual(1024);
        });
        
        it('should pass the otherView, otherViewRect and otherViewOuterRect to the function when bindingToOuterRect', function () {
          var rect = {}
          var outerRect = {}
          spyOn(otherView, 'outerRect').andReturn(outerRect);
          spyOn(otherView, 'rect').andReturn(rect);
          
          view.bindTo(otherView, {
            right: function (o, or, oor) {
              expect(o).toBe(otherView)
              expect(or).toBe(rect)
              expect(oor).toBe(outerRect)
            }
          })
        })
      })
    });
    describe("when repositioning the otherView", function () {
      it ("should effect the size bindings on the binding view", function () {
        view.bindTo(otherView, {
          width: function () {
            return 9876;
          }
        })
      
        otherView.moveTo({top: 14, right: 400});
      
        expect(view.outerRect().width).toEqual(9876);
      })
    });
    describe("when resizing the otherView", function () {
      it ("should effect the position bindings on the binding view", function () {
        view.bindTo(otherView, {
          top: function () {
            return 9876;
          }
        })
      
        otherView.resize({width: 140, height: 400});
      
        expect(view.outerRect().top).toEqual(9876);
      })
    })
    
    describe("specifying both top and bottom positions", function () {
      it('should arrange the bound view centered between the two points', function () {
        otherView.outerResize({width: 400, height: 300});
        view.outerResize({width: 350, height: 110});
        view.bindTo(otherView, {
          top: 0.2,
          bottom: 0.9
        })
        var eTop = (0.2*300) + (((0.9*300)-(0.2*300)) / 2) - (110/2)
        var eBottom = eTop + 110
        
        var r = view.outerRect();
        expect(r.top).toBe(eTop);
        expect(r.bottom).toBe(eBottom);  
      })
    })
    
    describe('specifiying both left and right positions', function () {
      it('should arrange the bound view centered between the two points', function () {
        otherView.outerResize({width: 400, height: 300});
        view.outerResize({width: 150, height: 110});
        view.bindTo(otherView, {
          left: 0.1,
          right: 0.8
        })
        var eLeft = (0.1*400) + (((0.8*400)-(0.1*400)) / 2) - (150/2)
        var eRight = eLeft + 150
        
        var r = view.outerRect();
        expect(r.left).toBe(eLeft);
        expect(r.right).toBe(eRight);  
      })
    })
    
    describe("binding to ancestors", function () {
      it('should result in a binding with bindToOuterRect being false', function () {
        view.addTo(otherView);
        view.bindToParent({});
        expect(view.binding().bindToOuterRect).toBe(false);
      })
      it('should result in a binding with bindToOuterRect being true if explicitly set', function () {
        view.addTo(otherView);
        view.bindToParent({
          bindToOuterRect: true
        })
        expect(view.binding().bindToOuterRect).toBe(true);
      })
    })
    
    describe("binding to non-ancestors", function () {
      it('should result in a binding where bindToOuterRect is true', function () {
        view.bindTo(otherView, {});
        expect(view.binding().bindToOuterRect).toBe(true);
      })
    })
    
    describe('binding with bindOuterRect', function () {
      it('should bind the inner rectangle when false', function () {
        otherView.z().css('borderWidth', 10);
        
        view.bindTo(otherView, {
          top: true,
          left: true,
          width: true,
          height: true,
          bindOuterRect: false,
          bindToOuterRect: false
        });
        
        otherView.resize({width: 300, height: 250}).moveTo({left: 30, top: 50});
        
        var r = view.rect();
        var r2 = otherView.rect();
        
        expect(r.width).toBe(r2.width);
        expect(r.height).toBe(r2.height);

        expect(r.top).toBe(r2.top);
        expect(r.left).toBe(r2.left);
      })
      it('should bind the outer rectangle when true', function () {
        otherView.z().css('borderWidth', 10);
        
        view.bindTo(otherView, {
          top: true,
          left: true,
          width: true,
          height: true,
          bindOuterRect: true,
          bindToOuterRect: true
        });
        
        otherView.outerResize({width: 300, height: 250}).outerMoveTo({left: 30, top: 50});
        
        var r = view.outerRect();
        var r2 = otherView.outerRect();
        
        expect(r.width).toBe(r2.width);
        expect(r.height).toBe(r2.height);

        expect(r.top).toBe(r2.top);
        expect(r.left).toBe(r2.left);
      })
      it('should default to true', function () {
        view.bindTo(otherView,{});
        expect(view.binding().bindOuterRect).toBe(true);
      })
    })
    
    describe('binding with bindToOuterRect', function () {
      it("should bind to the inner rect of otherView when false", function() {
        otherView.z().css('borderWidth', 10);
        
        view.bindTo(otherView, {
          top: true,
          left: true,
          width: true,
          height: true,
          bindToOuterRect: false
        });
        
        otherView.resize({width: 300, height: 250}).outerMoveTo({left: 30, top: 50});
        
        var r = view.outerRect();
        var r2 = otherView.rect();
        
        expect(r.width).toBe(r2.width);
        expect(r.height).toBe(r2.height);

        expect(r.top).toBe(r2.top);
        expect(r.left).toBe(r2.left);
      });

      it("should bind to outerRect of otherView when true", function() {
        otherView.z().css('borderWidth', 10);

        view.bindTo(otherView, {
          top: true,
          left: true,
          width: true,
          height: true,
          bindToOuterRect: true
        });

        otherView.outerResize({width: 300, height: 250}).outerMoveTo({left: 30, top: 50});

        var r = view.outerRect();
        var r2 = otherView.outerRect();

        expect(r.width).toBe(r2.width);
        expect(r.height).toBe(r2.height);

        expect(r.top).toBe(r2.top);
        expect(r.left).toBe(r2.left);
      });

      it("should default to true", function() {
        view.bindTo(otherView, {      });
        var b = view.binding();
        expect(b.bindToOuterRect).toBe(true);
      });
    })
    
  });

  describe("binding()", function () {
    it("should return null when the view is not bound", function () {
      expect(view.binding()).toBeNull();
    })
    it('should return the binding with the otherView', function () {
      var binding = {};
      view.bindTo(otherView, binding);
      var r = view.binding();
      
      expect(r.otherView).toBe(otherView);
      expect(r).toBe(binding);
    })
  })

  describe("unbind()", function () {
    it('should be chainable', function () {
      var v = new View1;
      expect(v.unbind()).toBe(v);
    })
    it('should be inneffectual if there is no bound view', function () {
      expect(view.unbind().binding()).toBeNull();
    })
    
    it('should remove event listeners from the otherView', function () {

      view.bindTo(otherView, {
        left: function () { return 480; },
        width: function () { return 313; }
      });
      
      view.unbind();
      
      expect(otherView.onResized().listeners().length).toEqual(0);
      expect(otherView.onMoved().listeners().length).toEqual(0);
    })
    
    it('should result in subsequent calls to binding() returning null', function () {
      view.bindTo(otherView, {});
      view.unbind();
      expect(view.binding()).toBeNull();
    })
  });
  
  describe('bindToParent()', function () {
    it('should call bindTo with the parent of the view', function () {
      view.addTo(otherView);
      spyOn(view, 'bindTo');
      var binding = {};
      view.bindToParent(binding);
      expect(view.bindTo).toHaveBeenCalled();
    });
    it('should be chainable', function () {
      view.addTo(otherView);
      
      expect(view.bindToParent({})).toBe(view);
    });
    it("should not bind do nothing when called on a root view", function() {
      var v = new Superview
      
      v.bindToParent();
      
      expect(v.binding()).toBeNull();
    });
  })

  describe('when otherView is removed', function () {
    it('should unbind from the view', function () {
      spyOn(view, 'unbind');
      view.bindTo(otherView, {});
      otherView.remove();
      expect(view.unbind).toHaveBeenCalled();
    })
  })
});