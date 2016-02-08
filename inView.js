function inView(element) {
	this.el = element; // DOM node - element
	this.stateInView; // bool - is in view
	this.inView; // func - in callback
	this.outView; // func - out callback

	// get and set position vars
	(this.getBoundingRect = function() {
		var windowTop = window.scrollY;
		var windowBottom = windowTop + window.innerHeight;

		this.box = element.getBoundingClientRect();
		this.boxTop = this.box.top + windowTop;
		this.boxBottom = this.box.bottom + windowTop;
	}).bind(this);
	(this.isInView = function() {
		var windowTop = window.scrollY;
		var windowBottom = windowTop + window.innerHeight;
		var inView = (windowTop < this.boxBottom) && (windowBottom > this.boxTop);
		
		return inView;
	}).bind(this);
	(this.detectInView = function() {
		var isInView = this.isInView();
		if(isInView && (!this.stateInView || typeof this.stateInView === 'undefined')) {
			this.stateInView = true;
			this.inView&&this.inView();
		}
		else if(!isInView && (this.stateInView || typeof this.stateInView === 'undefined')) {
			this.stateInView = false;
			this.outView&&this.outView();
		}
	}).bind(this);

	// Set In View Functions
	(this.onInView = function(func) {
		this.inView = (function() {
			func.call(this);
		}).bind(this);
		this.detectInView();
	}).bind(this);
	(this.onOutView = function(func) {
		this.outView = (function() {
			func.call(this);
		}).bind(this);
		this.detectInView();
	}).bind(this);

	// init
	this.getBoundingRect();
	this.detectInView();

	window.addEventListener('scroll', function() {
		this.detectInView();
	}.bind(this));

	window.addEventListener('resize', function() {
		this.getBoundingRect();
	}.bind(this));
}