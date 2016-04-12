package ru.mototeamrussia.cmsj.admin.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import ru.mototeamrussia.cmsj.persistence.entities.ContentEntity
import ru.mototeamrussia.cmsj.persistence.repositories.ContentRepository

/**
 * Created by Eevy on 12.04.2016.
 */
@RestController
@RequestMapping(Array("/entity/content"))
class ContentController {

  @Autowired
  var contentRepository : ContentRepository = _

  @RequestMapping(path = Array("/{id}"), method =  Array(RequestMethod.GET))
  def doGet(@PathVariable id : Integer) : ContentEntity = contentRepository.findOne(id)

  @RequestMapping(path = Array(""), method = Array(RequestMethod.GET))
  def doQuery() :  java.lang.Iterable[ContentEntity] = contentRepository.findAll()

  @RequestMapping(path = Array(""), method = Array(RequestMethod.POST))
  def doSave(@RequestBody e : ContentEntity) : ContentEntity = contentRepository.save(e)

  @RequestMapping(path = Array(""), method = Array(RequestMethod.PUT))
  def doUpdate(@RequestBody e : ContentEntity) : ContentEntity = contentRepository.save(e)

}
