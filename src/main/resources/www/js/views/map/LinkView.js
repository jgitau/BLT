/*******************************************************************************
 * Copyright (c) 2015 Netfishers - contact@netfishers.onl
 *******************************************************************************/
define([
	'jquery',
	'underscore',
	'backbone',
	'jsplumb',
	'text!templates/map/link.html',
	'bootstrap'
], function($, _, Backbone, jsPlumb, linkTemplate) {

	return Backbone.View.extend({

		el: "#routerbox",

		template: _.template(linkTemplate),

		initialize: function(options) {
			var that = this;
			this.network = options.network;
			this.link1 = options.link1;
			this.link2 = options.link2;
			this.mapView = options.mapView;
			this.render();
		},
		
		render: function() {
			var that = this;

			$("#editbox").hide();
			this.$el.html("").show();
			var data = {
				link1: this.link1.toJSON(),
				link2: this.link2.toJSON(),
				router1: this.mapView.routers.findRouterByIdentifier(this.link1.get("localRouter")).toJSON(),
				router2: this.mapView.routers.findRouterByIdentifier(this.link1.get("remoteRouter")).toJSON(),
				gmaps: false
			};
			this.$el.html(this.template(data));

			this.$("#remove").off().on("click", function() {
				that.link1.destroy().done(function() {
					that.onDelete();
				});
				that.link2.destroy().done(function() {
					that.onDelete();
				});
				return false;
			});


			this.$el.show();
			this.$el.draggable({ handle: "h4", containment: "#diagrambox" });
			this.$el.on('click', function() {
				return false;
			});
			return this;
		},
		
		close: function() {
			this.$el.html("");
			this.$el.hide();
		}
		

	});
});
