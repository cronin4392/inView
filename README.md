inView.js
=========

Small Javascript Plugin to add event listeners when element goes on and off of screen.


Usage:
------

```
<script>
	var el = new inView(document.getElementById('inView'));
	el.onInView(function() {
		...
	});
	el.onOutView(function() {
		...
	});
</script>
```

Demo:
-----

### [Basic - demo.html](https://rawgit.com/cronin4392/inView/master/demo.html)