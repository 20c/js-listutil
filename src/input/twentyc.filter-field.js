/**
 * Functionality for text input fields to apply filters to
 * content
 *
 * Dependencies: 
 *   1. jquery >= 1.11.13
 *   2. twentyc.core.js
 */

(function($) {

tc.u.require_namespace("twentyc.widgets");

twentyc.widgets.filter_input = {
  init : function(opt) {
    $('[data-filter-target]').filterInput(opt);
  }
}

twentyc.jq.plugin(
  "filterInput",
  {
    init : function(opt) {
      this.each(function(idx) {
        var me = $(this);
    
        if(!me.data("filter-initialized")) {
          // init
    
          var target = $(me.data("filter-target"));
          var callback = function() {
            target.children(opt.rowSelector).filterInput("test", me.val().toLowerCase());
          }
    
          me.data("filter-initialized", true);
          me.data(
            "filter-timeout", 
            new tc.u.SmartTimeout(
              callback,
              opt.interval
            )
          );
    
          me.keyup(function(e) {
            me.data("filter-timeout").set(callback, opt.interval);
          });
        }
      });
    
    },
    test : function(value) {
      this.each(function(idx) {
        var me = $(this);
        var myvalue = me.data("filter-value")
        var status = (value ? false : true);
        if(myvalue && myvalue.toLowerCase().indexOf(value) > -1) {
          status = true;  
        }
        if(!status) {
          me.find('[data-filter-value]').each(function(idx_2) {
            var val = $(this).data("filter-value");
            if(val.toLowerCase().indexOf(value) > -1) {
              status = true;
            }
          });
        }
        if(status)
          me.show();
        else
          me.hide();
      });
    }
  },
  {
    rowSelector : ".row",
    interval : 100
  }
);

})(jQuery);
