jQuery(function( $ ) {
    var App = {
        init: function() {
            this.$form = $("form");
            this.$result = $("#result");
            this.res = "";       
            this.bindEvents();  
        },
        bindEvents: function(ev) {
            var form = this.$form;
            form.on("submit", this.search.bind(this));
        },
        search: function(event) {
            var self = this;
            self.toggleSearch();
            $.ajax({
              type: "POST",
              dataType: "JSON",
              url: "/search",
              data: {keyword: self.$form.find("input[name='keyword']").val(),
              domain: self.$form.find("input[name='domain']").val()},
              success: function(data) {
                self.res = self.result_html(data);
                self.render();
                self.toggleSearch();
              },
              error: function(ev, msg) {
                self.res = msg;
                self.res += " " + ev.statusText;
                self.render();
                self.toggleSearch();
              }
            });

            event.preventDefault();
        },
        toggleSearch: function() {
            var submit = this.$form.find("input[type='submit']");
            if(submit.is(":disabled")) {
                submit.attr("value", "Search");
                submit.removeAttr("disabled");
            }
            else {
                submit.attr("disabled","disabled");
                submit.attr("value", "Searching.....");
                this.res = "";
                this.render();
            }
        },
        result_html: function(data) {
            if (data.position === 0)
             return 'Not under the top 100';
            else
                return 'Position: ' + data.position + ' with ' + data.domain;
        },
        render: function() {
            this.$result.html(this.res);
        }
    };
    
    App.init();
});