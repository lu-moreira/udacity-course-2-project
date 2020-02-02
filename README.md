# Udagram Image Filtering Microservice

- Access Url: course-2-project-dev.us-east-2.elasticbeanstalk.com
- GitHub Link: https://github.com/lu-moreira/udacity-course-2-project
- EBS created screenshot is under the folder deployment_screenshots.

## Project Layoyt

The base structure is

```
.
├── src
│   └── controllers
│       └── images
│           └── image.middleware.ts
│           └── image.router.ts
│       └── index.router.ts
│   └── util
│       └── util.ts
│   └── server.ts
├── www
├── deployment_screenshots
```

## Basic workflow

On server.ts we have attached our IndexRouter, this router have attached the GET / default endpoint and another router called ImageRouter under the path /filteredimage. 

## GET /filteredimage endpoint

### Request 
`curl --location --request GET '{{HOST}}/filteredimage?image_url={{IMAGE_URL}}'`

### Posible responses

#### 400 Bad Request
This can happens, when the image_url query string is not parsed.

```json
{
    "error": "Image Url invalid"
}
```

#### 500 Internal Server Error
This can happens, when the server try to get the image and it's not available or is an unknown type to be parsed.

```json
{
    "error": "Could not find MIME for Buffer <null>"
}
```

#### 200 OK

Will return a image file with content-type image/jpeg.

