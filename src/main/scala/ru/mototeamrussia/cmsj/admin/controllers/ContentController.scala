package ru.mototeamrussia.cmsj.admin.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.{PathVariable, RequestMapping, RestController}
import ru.mototeamrussia.cmsj.persistence.entities.ContentEntity
import ru.mototeamrussia.cmsj.persistence.repositories.ContentRepository

/**
 * Created by Eevy on 12.04.2016.
 */
@RestController
@RequestMapping(Array("/entity/content/"))
class ContentController {

  @Autowired
  var contentRepository : ContentRepository = _

  @RequestMapping(Array("get/{id}"))
  def get(@PathVariable id : Integer) : ContentEntity = contentRepository.findOne(id)



}
