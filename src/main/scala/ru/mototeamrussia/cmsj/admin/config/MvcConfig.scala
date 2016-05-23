package ru.mototeamrussia.cmsj.admin.config

import java.nio.charset.Charset
import java.util.Properties

import org.springframework.context.annotation._
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.web.servlet.config.annotation.{DefaultServletHandlerConfigurer, ResourceHandlerRegistry, WebMvcConfigurerAdapter, EnableWebMvc}
import org.springframework.web.servlet.view.velocity.{VelocityViewResolver, VelocityConfigurer}

/**
 * Created by Eevy on 09.04.2016.
 */
@Configuration
@EnableWebMvc
@PropertySource(Array("classpath:application.properties"))
@Import(Array(classOf[JPAConfig]))
@ComponentScan(Array("ru.mototeamrussia.cmsj.admin"))
class MvcConfig extends WebMvcConfigurerAdapter {

  override def addResourceHandlers(registry: ResourceHandlerRegistry): Unit = {
    registry.addResourceHandler("/scripts/**").addResourceLocations("/scripts/")
    registry.addResourceHandler("/styles/**").addResourceLocations("/styles/")
    registry.addResourceHandler("/fonts/**").addResourceLocations("/fonts/")
  }

  override def configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer): Unit = configurer.enable()

  @Bean
  def stringHttpMessageConverter: StringHttpMessageConverter = {
    new StringHttpMessageConverter(Charset.forName("UTF-8"))
  }

  @Bean
  def viewResolver: VelocityViewResolver = {
    val vR = new VelocityViewResolver()
    vR.setPrefix("")
    vR.setSuffix(".vm")
    vR.setContentType("text/html; charset=UTF-8")
    vR.setToolboxConfigLocation("/WEB-INF/velocity-toolbox.xml")
    vR
  }

}
