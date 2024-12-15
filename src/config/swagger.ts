import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {

  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name:'Products',
        description:'API operations related to products'
      }
    ],
    info:{
      title:'REST API Node.js / Express / Typescript',
      version:"1.0.0",
      decsription:"API Docs for Products"
    }
  },
  apis: ['./src/router.ts'] 
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
 /* customCss: `
    .topbar-wrapper .link{
      content: url('https://monsters-shop-example.netlify.app/img/monsters_ind_12.png');
      height: 50px;
      width:50px;
    }
    .swagger-ui .topba {
      background-color: #2b3b45;
    }
  `,*/
  customSiteTitle:'REST API Express / Typescript'
}
export default swaggerSpec
export {
  swaggerUiOptions
}