#-*- coding:utf-8 -*-
import urllib
from bs4 import BeautifulSoup
import re
import os
import sys
import socket
import requests 


socket.setdefaulttimeout(2)
class spider(object):
    dir_url = []
    spider_url = []
    def __init__(self, urlx):
        print "into----------------"
        print urlx
        self._run(urlx)

    def _get_all_url(self,url):
        urls = []
        try:
            web = urllib.urlopen(url)
        except IOError:
            print "error"
        else:
            soup = BeautifulSoup(web.read(),"lxml")
    	
            # 通过正则过滤合理的url
            tags_a = soup.findAll(name='a', attrs={'href': re.compile("\S")})
            try:
                for tag_a in tags_a:
                    if not re.match('^https?',tag_a['href']):
                        if re.match('#',tag_a['href']):
                            continue
                        if re.match('javascript:;',tag_a['href']):
                            continue
                        if re.match('./',tag_a['href']):
                            tag_a['href'] = tag_a['href'].split('.')[1]
                            
                        # href后面接相对路径
                        tmp = url[::-1]
                        tmp = tmp.split('/',1)[1]
                        tmp = tmp[::-1]
                        if re.match('/',tag_a['href']):
                            tag_1 = tmp + tag_a['href']
                        else:
                            tag_1 = tmp + '/' + tag_a['href']
                            
                        # href后面接绝对路径
                        tmp = self.dir_url[0][::-1]
                        tmp = tmp.split('/',1)[1]
                        tmp = tmp[::-1]
                        if re.match('/',tag_a['href']):
                            tag_2 = tmp + tag_a['href']
                        else:
                            tag_2 = tmp + '/' + tag_a['href']
                            
                        urls.append(tag_1)
                        urls.append(tag_2)
                    else:
                        urls.append(tag_a['href'])
            except:
                pass
            
            return urls


    # 得到所有目标下的url
    def _get_local_urls(self,url):
        local_urls = []
        urls = self._get_all_url(url)
        for _url in urls:
            if re.match(self.dir_url[0],_url):
                local_urls.append(_url)
        return local_urls


    def _run(self,url):
        #本次结果
        print "---------------------localurls-----------------------"
        print url
        result_url = self._get_local_urls(url)
        if result_url=="error":
            pass
        else:
            for ret in result_url:
                print ret
                   
                #未被记录的url
            print "---------------------dir-----------------------"
            output_url = []
            for ret in result_url:
                dir = ret.split('?')[0]
                if dir not in self.dir_url:
                    try:
                        web = urllib.urlopen(ret)
                    except:
                        pass
                    if web.getcode() == 200:
                        self.dir_url.append(dir)
                        self.spider_url.append(ret)
                        output_url.append(dir)
                        print ret
            

            path = os.path.dirname(os.path.realpath(__file__)) + "\\file\\result\\MLPQ_scan.txt"
            f = open(path,"a+")
            for dir in output_url:
                dir = dir + "\n"
                f.write(dir[5:-1])
                f.write('\n')
            f.close()

if __name__ == '__main__':
    global count
    count = 0
    url='http://xyh.swust.edu.cn/'
    spider.spider_url.append(url)
    spider.dir_url.append(url.split('?')[0])
    path = os.path.dirname(os.path.realpath(__file__)) + "\\file\\result\\MLPQ_scan.txt"
    if os.path.exists(path):
        os.remove(path)
    print spider.spider_url
    while len(spider.spider_url) > 0:
        try:
            spider(spider.spider_url.pop())
        except:
            pass