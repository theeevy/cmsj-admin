package ru.mototeamrussia.cmsj.admin.config.core

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer
import ru.mototeamrussia.cmsj.admin.config.MvcConfig

/**
 * Created by Eevy on 09.04.2016.
 */
class MvcInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
  override def getRootConfigClasses: Array[Class[_]] = Array(classOf[MvcConfig])

  override def getServletConfigClasses: Array[Class[_]] = null

  override def getServletMappings: Array[String] = Array("/")
}
