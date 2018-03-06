

var Options = function () {
    this.Dir_Scan_url = 'http://xyh.swust.edu.cn/';
    this.Port_Scan_url = 'http://xyh.swust.edu.cn/';
    this.Mlpq_scan_url = 'http://xyh.swust.edu.cn/';
    this.Sqlliv_url = 'http://xyh.swust.edu.cn/';
    this.Sqlcheck_url = 'http://xyh.swust.edu.cn/';
    this.Sqlboom_url = 'http://xyh.swust.edu.cn/';
    this.cms_url = 'http://xyh.swust.edu.cn/';
 
	this.startport=1;
	this.endport=2000;
    this.Confirm = function () {}
};
 
var gui = new dat.GUI();
var options = new Options();

var cms=gui.addFolder('CMS_scan');
cms.add(options,"cms_url");
cms.add(options, 'Confirm').onChange(function () {
cms_handle(options.cms_url);
});
cms.open();

var f1 = gui.addFolder('Scan_ways');
 
 
var f11 = f1.addFolder('Dir_Scan');
f11.add(options, 'Dir_Scan_url');
f11.add(options, 'Confirm').onChange(function () {
    ca_handle(options.Dir_Scan_url);
});
 
var f12 = f1.addFolder('Port_Scan');
f12.add(options, 'Port_Scan_url');
f12.add(options, 'startport');
f12.add(options, 'endport');

f12.add(options, 'Confirm').onChange(function () {
    pory_handle(options.Port_Scan_url,options.startport,options.endport)
});
 
var f13 = f1.addFolder('Mlpq_scan');
f13.add(options, 'Mlpq_scan_url');
f13.add(options, 'Confirm').onChange(function () {
	console.log(options.Mlpq_scan_url)
    mlpq_handle(options.Mlpq_scan_url)
});
 
f1.open();
f11.open();
f12.open();
f13.open();
var f2 = gui.addFolder('Sql_ways');
var f21 = f2.addFolder('Sqlliv');
var f22 = f2.addFolder('Sqlcheck');
var f23 = f2.addFolder('Sqlboom');
 
f21.add(options, 'Sqlliv_url');
f21.add(options, 'Confirm').onChange(function () {
    sql_handle(options.Sqlliv_url)
});
 
f22.add(options, 'Sqlcheck_url');
f22.add(options, 'Confirm').onChange(function () {
});
 
f23.add(options, 'Sqlboom_url');
f23.add(options, 'Confirm').onChange(function () {
    console.log(options.Sqlboom_url)
});
 
f2.open();
f21.open();
f22.open();
f23.open();
var customContainer = document.getElementById('Ways');
customContainer.appendChild(gui.domElement);