# Cleaner Conquest
The Best Cleaning Service


### Swagger Documentation: http://localhost:9090/swagger-ui/index.html


#### Execute Sql file after running the server for the first time only
<h4 style="color:#92c961">carpetUser.sql<h4>

### /worker/update/{id}

#### PUT
##### Summary:

Update Worker Details

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Updated successfully |
| 204 | Wrong Worker Id |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/update/{id}

#### PUT
##### Summary:

Update Customer Details

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Updated successfully |
| 204 | Wrong Customer Id |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /worker/save

#### POST
##### Summary:

Add New Worker

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Added successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/save

#### POST
##### Summary:

Add New Product From Form

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | query |  | Yes | string |
| category | query |  | Yes | string |
| description | query |  | Yes | string |
| productUnit | query |  | Yes | string |
| priceUnit | query |  | Yes | string |
| price | query |  | Yes | double |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Added successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/saveJson

#### POST
##### Summary:

Add New Product AS Json (No Image Required)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Added successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/save

#### POST
##### Summary:

Add New Order

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Added successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/save

#### POST
##### Summary:

Add New Customer

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Added successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /api/auth/signup

#### POST
##### Summary:

Sign Up

##### Description:

For role use admin for admin,mod for moderator and "" for user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | User registered successfully! |
| 400 | Error: Username/Email is already taken! Error:Role is not found! |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

### /api/auth/signout

#### POST
##### Summary:

Sign Out

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Signed Out successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

### /api/auth/signin

#### POST
##### Summary:

Sign In

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Sign in successfully |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

### /api/auth/refreshtoken

#### POST
##### Summary:

Refresh JWT By the refresh token

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done |
| 401 | Unauthorized |
| 403 | Refresh token is not in database! |
| 404 | not found |

### /worker/countByDate{date}

#### GET
##### Summary:

Get Number Of Workers Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Workers |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /worker/byName{name}

#### GET
##### Summary:

Get All Workers By Name

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Workers Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /worker/

#### GET
##### Summary:

Get All The Available Worker

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Workers Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/display/{id}

#### GET
##### Summary:

Get Product Image

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Wrong Product ID |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/details{id}

#### GET
##### Summary:

Get Product Details

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Wrong Product ID |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/

#### GET
##### Summary:

Get All The Available Products

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Products Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/updateStatus{id}

#### GET
##### Summary:

Update Order Status

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Updated successfully |
| 204 | Wrong Order Id |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/sumUnfinishedByDate{date}

#### GET
##### Summary:

Money Expected From Unfinished Orders Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Orders |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/sumFinishedByDate{date}

#### GET
##### Summary:

Money Gained From Finished Orders Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Orders |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/countUnfinished{date}

#### GET
##### Summary:

Get Number Of Unfinished Orders Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Orders |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/countByDate{date}

#### GET
##### Summary:

Get Number Of Orders Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Orders |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/byName{name}

#### GET
##### Summary:

Get All Orders By Name

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Orders Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /order/

#### GET
##### Summary:

Get All The Available Orders

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Orders Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/countByDate{date}

#### GET
##### Summary:

Get Number Of Customer Before Specific Date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| date | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | Zero Customers |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/byName{name}

#### GET
##### Summary:

Get All Customers By Name

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Customers Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/

#### GET
##### Summary:

Get All The Available Customers

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Done successfully |
| 204 | No Customers Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /worker/unemploy{id}

#### DELETE
##### Summary:

Unemploy Worker Details

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query |  | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Unemployed successfully |
| 204 | Wrong Worker Id |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /product/deleteById{id}

#### DELETE
##### Summary:

Delete Products By ID

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Deleted successfully |
| 204 | One of the Product Not Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |

### /customer/deleteById

#### DELETE
##### Summary:

Delete Customers By ID

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Deleted successfully |
| 204 | One of the customers Not Found |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| Bearer Authentication | |
