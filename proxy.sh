#!/bin/bash

http_proxy="http://用户名:密码@代理IP:代理端口"
readonly http_proxy
main(){
  echo "当前用户：$USER  ID：`id -u`"
  echo "当前时间：`date`"
  echo "正在设置代理------------"
  #export http_proxy=$http_proxy
  #unset http_proxy
  #error_exit "$LINENO: failed"
  export http_proxy=$http_proxy
  if [ $? == 0 ]
  then
        echo "代理地址：$http_proxy"
        cho "代理设置完成------------"
        echo "进程ID：$$"
  else
        echo "代理设置失败[$LINENO]------------"
        exit 1
  fi
}
main
