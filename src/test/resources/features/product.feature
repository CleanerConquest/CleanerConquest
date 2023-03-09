Feature:product

  Scenario: admin sign in with right credentials and tries to get all products
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/product/"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with wrong credentials and tries to get all products
    Given 'amr'|'test12'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]
    When the client after auth "GET" "/product/"
    Then the client receives status code of [401]


  Scenario: admin sign in with right credentials and tries to delete products with id
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200,204]
    Given request body
      | ids  |
      | List |
      | 5    |
    When the client after auth "DELETE" "/product/deleteById"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with right credentials and tries to get product image
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/product/display/1"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with right credentials and tries to get product details
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/product/details?id=1"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with right credentials and tries to add a product
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | name   | category      | description | priceUnit | productUnit | price  |
      | String | String        | String      | String    | String      | Double |
      | carpet | house gadgets | testing     | ils       | m²          | 10.0     |
    When the client after auth "POST" "/product/saveJson"
    Then the client receives status code of [200]

