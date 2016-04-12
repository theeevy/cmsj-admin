package ru.mototeamrussia.cmsj.admin.config

import javax.persistence.EntityManagerFactory
import javax.sql.DataSource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, PropertySource, Configuration}
import org.springframework.core.env.Environment
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.springframework.orm.jpa.{JpaTransactionManager, LocalContainerEntityManagerFactoryBean, JpaVendorAdapter, JpaDialect}
import org.springframework.orm.jpa.vendor.{Database, HibernateJpaVendorAdapter, HibernateJpaDialect}
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.EnableTransactionManagement

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:application.properties")
class JPAConfig {
  @Autowired
  var environment : Environment = _

  @Bean
  def dataSource() : DataSource = {
    val dS = new DriverManagerDataSource()
    dS.setDriverClassName(environment.getRequiredProperty("jdbc.driverClassName"))
    dS.setUrl(environment.getRequiredProperty("jdbc.url"))
    dS.setUsername(environment.getRequiredProperty("jdbc.username"))
    dS.setPassword(environment.getRequiredProperty("jdbc.password"))
    dS
  }

  @Bean
  def jpaDialect() : JpaDialect = new HibernateJpaDialect()

  @Bean
  def jpaVendorAdapter() : JpaVendorAdapter = {
    val jVA = new HibernateJpaVendorAdapter()
    jVA.setDatabase(Database.MYSQL)
    jVA.setDatabasePlatform(environment.getRequiredProperty("hibernate.dialect"))
    jVA.setShowSql(environment.getRequiredProperty("hibernate.show_sql", classOf[Boolean]))
    jVA
  }

  @Bean
  def entityManagerFactory() : LocalContainerEntityManagerFactoryBean = {
    val eMF = new LocalContainerEntityManagerFactoryBean()
    eMF.setPersistenceXmlLocation("classpath:META-INF/persistence.xml")
    eMF.setPersistenceUnitName("ru.mototeamrussia.cmsj.persistence.unit")
    eMF.setDataSource(dataSource())
    eMF.setJpaVendorAdapter(jpaVendorAdapter())
    eMF.setJpaDialect(jpaDialect())
    eMF
  }

  @Bean
  def transactionManager(entityManagerFactory : EntityManagerFactory) : PlatformTransactionManager = {
    val jTM = new JpaTransactionManager()
    jTM.setDataSource(dataSource())
    jTM.setEntityManagerFactory(entityManagerFactory)
    jTM.setJpaDialect(jpaDialect())
    jTM
  }
}
