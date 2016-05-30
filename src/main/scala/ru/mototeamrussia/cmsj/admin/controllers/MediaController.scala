package ru.mototeamrussia.cmsj.admin.controllers

import java.nio.file.attribute.FileAttribute
import java.nio.file.{Path, Paths, Files}
import java.util
import java.util.function.Consumer

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.{RequestParam, RequestMethod, RequestMapping, RestController}
import org.springframework.web.multipart.MultipartFile
import ru.mototeamrussia.cmsj.persistence.entities.{MediaItemType, MediaItem}

import scala.collection.mutable.Buffer
import scala.collection.JavaConversions._


/**
 * Created by Eevy on 07.05.2016.
 */
@RestController
@RequestMapping(Array("/entity/media"))
class MediaController {
  val log = LoggerFactory.getLogger(classOf[MediaController])

  @Autowired
  var env : Environment = _

  @RequestMapping(Array("/filetree"))
  def showFileTree : java.util.List[MediaItem] = {
    var result : Buffer[MediaItem] = Buffer.empty[MediaItem]
    Files.walk(Paths.get(env.getRequiredProperty("cmsj.path_to_images"))).forEach( new Consumer[Path]{
      override def accept(t: Path): Unit = {

        val chain = new util.ArrayList[Path]()

        chain.add(t)

        var currentPart = t
        while(!currentPart.endsWith("images")){
          currentPart = currentPart.getParent
          chain.add(currentPart)
        }

        val mirroredChain = new util.ArrayList[Path]()

        for ( i <- (0 to chain.size()-1).reverse){
          mirroredChain.add(chain(i))
        }

        // find first node
        val rootFileName = mirroredChain(0).toFile.getName
        var firstNode : MediaItem = null
        result.find(p => rootFileName.equals(p.getName)) match {
          case Some(value) => firstNode = value
          case None => {
            firstNode =  new MediaItem(rootFileName,MediaItemType.DIR,Buffer.empty[MediaItem])
            result += firstNode
          }
        }

        var currentNode = firstNode

        for ( i <- 1 to mirroredChain.size()-1){
          val file = mirroredChain(i).toFile
          val fileName = file.getName
          val itemType = if (file.isDirectory) MediaItemType.DIR else MediaItemType.FILE

          currentNode.getChildren.find(p => p.getName.equals(fileName)) match {
            case Some(value) => currentNode = value
            case None => {
              val nn = new MediaItem(fileName, itemType, Buffer.empty[MediaItem])
              currentNode.getChildren += nn
              currentNode = nn
            }
          }
        }
      }
    })
    result
  }

  @RequestMapping(Array("/mkdir"))
  def doMkDir(@RequestParam path: String) : MediaItem = {
    val dirPath = Files.createDirectory(Paths.get(env.getRequiredProperty("cmsj.path_to_images") + path))

    new MediaItem(dirPath.toFile.getName, MediaItemType.DIR, new util.ArrayList[MediaItem])
  }

  @RequestMapping(path = Array("/upload"), method = Array(RequestMethod.POST))
  def doUpload(@RequestParam("blob") blob : MultipartFile ) : MediaItem = {
    log.info("name: " + blob.getName)
    log.info("originalFilename: " + blob.getOriginalFilename)
    log.info("contentType: " + blob.getContentType)
    log.info("size: " + blob.getSize)

    new MediaItem(blob.getOriginalFilename, MediaItemType.FILE, new util.ArrayList[MediaItem])
  }

}
