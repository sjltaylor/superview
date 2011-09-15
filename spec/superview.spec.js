describe('superview', function () {
  it("should assign unique ids", function () {
    var v1 = new View1, v2 = new View1, v3 = new View1;
  
    expect(v1.vid()).not.toEqual(v2.vid());    
    expect(v1.vid()).not.toEqual(v3.vid());    
    expect(v2.vid()).not.toEqual(v3.vid());    
  })  
  
  it("should have a hasViewMixin flag", function () {
    var v1 = new View1
    expect(v1.hasViewMixin).toBe(true);
  })
  
  it("return the set controller correctly", function () {
    var view = new Superview;
    var ctrlr = {};
    view.setController(ctrlr);
    
    expect(view.getController()).toBe(ctrlr);
  });
  
  describe("dom related behaviour", function () {
    it('returns a HTMLDivElement when calling elem()', function () {
      var v1 = new View1
      var e = v1.elem()
      expect(e).toBeInstanceOf(HTMLDivElement)
      expect(e.nodeName).toEqual('DIV')
    })
  
    it("can provide the jquery result of DOM building with the 'z' library", function () {
      expect(new View1().$()).toBeInstanceOf(jQuery);
    });
    
    it('should initialize its div container as position:absolute display:inline-block', function () {
      expect(new View1().$().css('position')).toEqual('absolute');
      expect(new View1().$().css('display')).toEqual('inline-block');
    })
  })
  
  describe("initialization protocol", function () {
    it('should anchor and then populate the view tree recursively', function () {
      
      var a = new Superview, b = new Superview, c = new Superview;
      a.add(b, c);
      
      var callOrder = [];
      var f = function () {
        callOrder.push(this);
      }
      
      a.bind= f;
      b.bind= f;
      c.bind= f;
      
      a.populate = f;
      b.populate = f;
      c.populate = f;
      
      a.initialize();
      
      expect(callOrder).toContain(a);
      expect(callOrder).toContain(b);
      expect(callOrder).toContain(c);
    })
    
    it('should be chainable', function () {
      var v = new Superview();
      var r = v.initialize();
      expect(r).toBe(v);
    })
  })
  
  describe('update()', function () {
    it('should call populate by default', function () {
      var v = new Superview;
      spyOn(v, 'populate');
      v.update();
      expect(v.populate).toHaveBeenCalled();
    })
  })
});

