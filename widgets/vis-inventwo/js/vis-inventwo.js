/*
	ioBroker.vis vis-inventwo Widget-Set

	version: "0.0.1"

	Copyright 2020 jkvarel jkvarel@inventwo.com
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
        // Add words for basic widgets
        $.extend(true, systemDictionary, {
            "Instance": {
		        "en": "Instance",
		        "de": "Instanz"
            },
            "iText": {
	        	"en": "Label",
	        	"de": "Beschriftung"
            },
            "iIconSize": {
	        	"en": "Icon size",
	        	"de": "Bild Größe"
            },
            "group_i-css": {
	        	"en": "CSS inventwo Button",
	        	"de": "CSS inventwo Button"
            },
            "iButtonCol": {
	        	"en": "color",
	        	"de": "Farbe"
            },
            "iTextSize": {
	        	"en": "Label size",
	        	"de": "Beschriftungsgröße"
            },
            "iImageFalse": {
	        	"en": "Icon false",
	        	"de": "Bild falsch"
            },
            "iImageTrue": {
	        	"en": "Icon true",
	        	"de": "Bild wahr"
            },
            "iImage": {
	        	"en": "Icon",
	        	"de": "Bild"
            },
            "iCornerRadius": {
	        	"en": "Border radius",
	        	"de": "Abrundung"
            },
            "iOpacity": {
	        	"en": "Opacity",
	        	"de": "Transparenz"
            },
            "iTextFalse": {
	        	"en": "Label  false",
	        	"de": "Beschriftung falsch"
            },
            "iTextTrue": {
	        	"en": "Label true",
	        	"de": "Beschriftung wahr"
            },
            "iButtonActive": {
	        	"en": "Active color",
	        	"de": "Aktiv Farbe "
            },
            "iTextColor": {
	        	"en": "Text color",
	        	"de": "Textfarbe "
            }
        });
    }

// this code can be placed directly in vis-inventwo.html
vis.binds["vis-inventwo"] = {
	version: "0.0.1",
	showVersion: function () {
		if (vis.binds["vis-inventwo"].version) {
			console.log("Version vis-inventwo: " + vis.binds["vis-inventwo"].version);
			vis.binds["vis-inventwo"].version = null;
		}
	},
	createWidget: function (widgetID, data) {
		var $div = $("#" + widgetID);
		// if nothing found => wait
		if (!$div.length) {
			return setTimeout(function () {
				vis.binds["vis-inventwo"].createWidget(widgetID, data);
			}, 100);
		}

        var htmlText = "<div class='vis-inventwo-class vis-widget-body" + data.class;
        // Widget body css
        var css = "style='background: ";
        if(vis.states.attr(data.oid + '.val')){
            css += data.iButtonActive;
        }
        else{
            css += data.iButtonCol;
        }
        css += ";border-radius" + data.iCornerRadius + "px;";

        htmlText += css + "'>";
        
        htmlText += "<div style='padding: 7px'>";
        htmlText += "<div class='vis-inventwo-button-imageContainer'>"
        htmlText += "<img src='";
        if(vis.states.attr(data.oid + '.val')){
            htmlText += data.iImageTrue;
        }
        else{
            htmlText += data.iImageFalse;
        }
        htmlText += "' width='" + data.iIconSize + "'>";

        htmlText += "</div><div class='vis-inventwo-button-text' style='font-size:" + data.iTextSize + "px'>"
        if(vis.states.attr(data.oid + '.val')){
            htmlText += data.iTextTrue;
        }
        else{
            htmlText += data.iTextFalse;
        }
        htmlText += "</div></div>"

		$("#" + widgetID).html(htmlText);

        // subscribe on updates of value
        /*
		if (data.oid) {
			vis.states.bind(data.oid + ".val", function (e, newVal, oldVal) {
				$div.find(".vis-inventwo-value").html(newVal);
			});
		}*/
    },

    handleToggle: function (el, data) {

            var $this = $(el);
            
            var oid = data.oid;
            var valFalse = false;
            var valTrue = true;

            //$(el).html(valFalse);

            if (!vis.editMode) {
               
                    $this.parent().click(function () {
                        var val = vis.states[oid + '.val'];
                        vis.setValue(oid, !val);
                        /*
                        var val = vis.states[oid + '.val'];
                        $(el).html('test: ' + val);
                            if(val == valFalse){
                                vis.setValue(oid, valTrue);
                            }
                            else{
                                vis.setValue(oid, valFalse);
                            }*/
                    });
                
            }
    },
    handleNavigation: function (el, data) {
        if (!vis.editMode && data.nav_view) {
            var $this = $(el);
            var moved = false;
            $this.on('click touchend', function (e) {
                // Protect against two events
                if (vis.detectBounce(this)) return;
                if (moved) return;
                vis.changeView(data.nav_view, data.nav_view);
                //e.preventDefault();
                //return false;
            }).on('touchmove', function () {
                moved = true;
            }).on('touchstart', function () {
                moved = false;
            });
        }
    },
    state: function (el, data) {

            var $this = $(el);
            
            var oid = data.oid;

            //$(el).html(valFalse);

            if (!vis.editMode) {
               
                    $this.parent().click(function () {
                        
                        vis.setValue(oid, data.value);
                        /*
                        var val = vis.states[oid + '.val'];
                        $(el).html('test: ' + val);
                            if(val == valFalse){
                                vis.setValue(oid, valTrue);
                            }
                            else{
                                vis.setValue(oid, valFalse);
                            }*/
                    });
                
            }
    }
};

vis.binds["vis-inventwo"].showVersion();