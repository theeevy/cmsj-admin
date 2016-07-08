package ru.mototeamrussia.cmsj.admin.controllers

import java.util
import java.util.function.Consumer

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.{PageRequest, Page, Sort}
import org.springframework.web.bind.annotation._
import ru.mototeamrussia.cmsj.persistence.entities.{ContentTagEntityPK, ContentTagEntity, TagEntity, ContentEntity}
import ru.mototeamrussia.cmsj.persistence.repositories.{ContentTagRepository, TagRepository, ContentRepository}

/**
 * Created by Eevy on 04.05.2016.
 */
@RestController
@RequestMapping(Array("/entity/tag"))
class TagController {
  val log = LoggerFactory.getLogger(classOf[TagController])

  @Autowired
  var tagRepository : TagRepository = _

  @Autowired
  var contentTagRepository : ContentTagRepository = _

  @Autowired
  var contentRepostiory : ContentRepository = _

  @RequestMapping(path = Array("/{id}"), method =  Array(RequestMethod.GET))
  def doGet(@PathVariable id : Integer) : TagEntity = tagRepository.findOne(id)

  @RequestMapping(method = Array(RequestMethod.GET))
  def doQuery() :  java.lang.Iterable[TagEntity] = tagRepository.findAll()

  @RequestMapping(method = Array(RequestMethod.POST))
  def doSave(@RequestBody e : TagEntity) : TagEntity = tagRepository.save(e)

  @RequestMapping(method = Array(RequestMethod.PUT))
  def doUpdate(@RequestBody e : TagEntity) : TagEntity = tagRepository.save(e)

  @RequestMapping(path = Array("/contentId={contentId}"), method = Array(RequestMethod.GET))
  def doByContent(@PathVariable contentId : Integer) : java.lang.Iterable[TagEntity] = {
    if (0.equals(contentId)) {
      log.error("!!Set contentId!!")
      return new util.ArrayList[TagEntity]
    }

    val content = contentRepostiory.findOne(contentId)
    val content2tag = contentTagRepository.findByIdContent(content)
    val tags = new util.ArrayList[TagEntity]
    content2tag.forEach(new Consumer[ContentTagEntity] {
      override def accept(t: ContentTagEntity): Unit = tags.add(t.getId.getTag)
    })
    tags
  }

  @RequestMapping(path = Array("/mark"), method = Array(RequestMethod.GET))
  def doMark( @RequestParam contentId : Integer,
              @RequestParam tagId : Integer) : Unit = {
    val content = contentRepostiory.findOne(contentId)
    val tag = tagRepository.findOne(tagId)

    val c2t = new ContentTagEntity
    c2t.setId(new ContentTagEntityPK(content,tag,1))
    c2t.setCoreContentId(6)
    c2t.setTypeAlias("com_content.article")

    contentTagRepository.save(c2t)
  }

  @RequestMapping(path = Array("/unmark"), method = Array(RequestMethod.GET))
  def doUnmark(@RequestParam contentId : Integer,
               @RequestParam tagId : Integer) : Unit = {
    val content = contentRepostiory.findOne(contentId)
    val tag = tagRepository.findOne(tagId)

    contentTagRepository.delete(new ContentTagEntityPK(content,tag,1))
  }
}
