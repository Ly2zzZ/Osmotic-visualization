#coding:utf-8
#!/usr/bin/env python
# SQLiv v2.0
# Ghost (github.com/Hadesy2k)
# official.ghost@tuta.io
from webdirscan import Dirscan
from cms_scan import gwhatweb
from portscan import Scanner
from spider import spider
from webdirscan import Dirscan
from sqliv import Sqliv

import json
from flask import Flask, request, send_from_directory,render_template, g, redirect, url_for, session, jsonify, make_response, send_file

from webdirscan import Dirscan 
from portscan import Scanner
from cms_scan import gwhatweb
from Queue import Queue
import argparse
import requests
import threading
import json
from flask import Flask, request, send_from_directory,render_template, g, redirect, url_for, session, jsonify, make_response, send_file

from Queue import Queue
import argparse
import requests
import threading
import json
from flask import Flask, request, send_from_directory,render_template, g, redirect, url_for, session, jsonify, make_response, send_file

import sys
import socket
import logging
import dns.resolver
from time import time
from time import sleep
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from requests.packages.urllib3.exceptions import InsecureRequestWarning


import hashlib
import gevent
from gevent.queue import Queue
from time import clock

import os
# 线程池
from multiprocessing.dummy import Pool as ThreadPool
from multiprocessing.dummy import Lock

reload(sys)
sys.setdefaultencoding('utf-8')
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

app = Flask(__name__, static_url_path='')

app.route('/index')
@app.route('/')
def index(name=None):
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./js', path)

@app.route('/css/<path:path>')
def send_css(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./css', path)
 
@app.route('/file/<path:path>')
def send_file(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./file', path)

@app.route('/fonts/<path:path>')
def send_font(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./fonts', path)

@app.route('/images/<path:path>')
def send_images(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./images', path)


Optimes=0

@app.route('/getop')
def getop():
    temp=list()
    temp.append({"x":Optimes})
    return jsonify(temp)

#------------目录扫描-------------------------------------------------------------------------------


class webdirscanInf():
    scanSite='https://www.bilibili.com/'
    scanDict='file/dict/dict.txt'
    scanOutput='file/result/Dir_scan.txt'
    threadNum=30

@app.route('/geturl', methods = ['GET', 'POST'])
def geturl():
    a = request.json
    webdirscanInf.scanSite=a["url"]
    return "200"

@app.route('/mulu')
def Scan():
    try:
        scan = Dirscan(webdirscanInf.scanSite, webdirscanInf.scanDict, webdirscanInf.scanOutput, webdirscanInf.threadNum)
        for i in range(webdirscanInf.threadNum):
            t = threading.Thread(target=scan.run)
            t.setDaemon(True)
            t.start()

        while True:
            if threading.activeCount() <= 2 :
                break
            else:
                try:
                    sleep(0.5)
                except KeyboardInterrupt, e:
                    print '\n[WARNING] User aborted, wait all slave threads to exit, current(%i)' % threading.activeCount()
                    scan.STOP_ME = True
        print 'Scan end!!!'
        x = {}
        result = list()
        data = file('./file/result/Dir_scan.txt')
        for line in data:
            result.append({"id":str(line[0:-1])});

        final=list()
        final.append({"content":result,"ways":"mulu"})

        str1='file\history\op'+str(Optimes)+'.txt'
        with open(str1, 'a+') as f:
            f.write(str(final).replace("\'","\""))

        global Optimes
        Optimes=Optimes+1
        f = open('./file/optimes.txt','wb')
        f.write(str(Optimes))
        return jsonify(result)
    except:
        print "--------------------Error----------------------"

#------------端口扫描-------------------------------------------------------------------------------
class Portinf():
    url="127.0.0.1";
    start=0;
    end=2000;

@app.route('/getport', methods = ['GET', 'POST'])
def getport():
    a = request.json
    Portinf.url=a["url"]
    return "200"

@app.route('/Portscan')
def Portscan():
    logger = logging.getLogger(__name__)
    list_res = list()
    myscan = Scanner(Portinf.url, Portinf.start, Portinf.end)
    myscan.check_target()
    result2 = list()
    data2 = file('./file/result/Port_scan.txt')
    for line in data2:
        result2.append({"openport":line[0:-1]});

    final = list()
    final.append({"content":result2,"ways":"Portscan"})

    str1='file\history\op'+str(Optimes)+'.txt'
    with open(str1, 'a+') as f:
        f.write(str(final).replace("\'","\""))

    global Optimes
    Optimes=Optimes+1
    f = open('./file/optimes.txt','wb')
    f.write(str(Optimes))

    return jsonify(result2)



#------------cms扫描-------------------------------------------------------------------------------
class CMSinf():
    url='http://xyh.swust.edu.cn/';

@app.route('/getcms', methods = ['GET', 'POST'])
def getcms():
    a = request.json
    CMSinf.url=a["url"]
    return "200"

@app.route('/CMSscan')
def CMSscan():
	g = gwhatweb(CMSinf.url)
	g.whatweb(1000)
	result3 = list()
	data3 = file('./Cms_scan.txt')
	for line in data3:
		result3.append(line[0:-1]);
	return jsonify(result3)



#------------目录爬去-------------------------------------------------------------------------------
class MuluPaQuInf():
    url='http://x阿三大苏打yh.swust.edu.cn/';

@app.route('/getDir', methods = ['GET', 'POST'])
def getDir():
    a = request.json
    MuluPaQuInf.url=a["url"]
    return "200"

@app.route('/MuluPaQu')
def MuluPaQu():
    print "==================================="
    print MuluPaQuInf.url
    try:
        print MuluPaQuInf.url
        global count
        count = 0
        spider.spider_url.append(MuluPaQuInf.url)
        spider.dir_url.append(MuluPaQuInf.url.split('?')[0])
        path = os.path.dirname(os.path.realpath(__file__)) + "\\MLPQ_scan.txt"
        if os.path.exists(path):
            os.remove(path)
        print spider.spider_url
        flag=0
        while len(spider.spider_url) > 0:
            try:
                spider(spider.spider_url.pop())
                flag=1
            except:
                pass
        if flag==1:
            result4 = list()
            data4 = file('./file/result/MLPQ_scan.txt')
            for line in data4:
                result4.append({"id":line[5:-1]});

            final = list()
            final.append({"content":result4,"ways":"MuluPaQu"})

            str1='file\history\op'+str(Optimes)+'.txt'
            with open(str1, 'a+') as f:
                f.write(str(final).replace("\'","\""))

            global Optimes
            Optimes=Optimes+1
            f = open('./file/optimes.txt','wb')
            f.write(str(Optimes))
            return jsonify(result4)
    except:
        print "--------------------Error----------------------"
#------------sqliiv-------------------------------------------------------------------------------
class SqlInf:
    dork="None"
    engine="None"
    page="None"
    target="http://www.szssh.org/"
    reverse="None"
    output="resql.txt"

@app.route('/getsql', methods = ['GET', 'POST'])
def getsql():
    a = request.json
    SqlInf.url=a["url"]
    return "200"

@app.route('/sqlinto')
def sqlinto():
	Sqliv(SqlInf)


if __name__ == '__main__':
    Optimes = open('./file/optimes.txt')
    Optimes = 'asd'+str(Optimes.readline())
    Optimes=int(Optimes[3])
    print Optimes
    app.run(host='0.0.0.0',port=5000,debug=True)