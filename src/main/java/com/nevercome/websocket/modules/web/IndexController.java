package com.nevercome.websocket.modules.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: sun
 * @Description:
 * @Date: 2019/4/2
 */
@Controller
@RequestMapping(value = "")
public class IndexController  {

    @RequestMapping(value = "/single")
    public String showSinge(HttpServletRequest request, HttpServletResponse response){
        return "GameSingle";
    }

    @RequestMapping(value = "/double")
    public String showDouble(HttpServletRequest request, HttpServletResponse response) {
        return "GameDouble";
    }

}
