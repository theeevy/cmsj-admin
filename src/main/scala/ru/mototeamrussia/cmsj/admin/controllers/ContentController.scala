package ru.mototeamrussia.cmsj.admin.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.{Page, Sort, PageRequest}
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

  @RequestMapping(method = Array(RequestMethod.GET))
  def doQuery() :  java.lang.Iterable[ContentEntity] = contentRepository.findAll()

  @RequestMapping(path = Array("/page"),method = Array(RequestMethod.GET))
  def doPage(@RequestParam offset : Integer,
             @RequestParam count : Integer,
             @RequestParam column : String,
             @RequestParam dir : Sort.Direction) :  Page[ContentEntity] = contentRepository.findAll(new PageRequest(offset,count,dir,column))

  @RequestMapping(method = Array(RequestMethod.POST))
  def doSave(@RequestBody e : ContentEntity) : ContentEntity = contentRepository.save(e)

  @RequestMapping(method = Array(RequestMethod.PUT))
  def doUpdate(@RequestBody e : ContentEntity) : ContentEntity = contentRepository.save(e)

}
