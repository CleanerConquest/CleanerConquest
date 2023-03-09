Feature:customer

  Scenario: admin sign in with right credentials and tries to add a customer
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | firstName | lastName | phoneNumber | emailAddress           | address           |
      | String    | String   | String      | String                 | String            |
      | Zaid      | Balout   | 0569518004  | zaidbalout@outlook.com | AlMasakin, Nablus |
    When the client after auth "POST" "/customer/save"
    Then the client receives status code of [200]

  Scenario: admin sign in with right credentials and tries to update a customer
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | firstName | lastName | phoneNumber | emailAddress         | address       |
      | String    | String   | String      | String               | String        |
      | Amr       | Kurdi    | 0598023984  | amrkurdi07@gmail.com | Mraij, Nablus |
    When the client after auth "PUT" "/customer/update/1"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with right credentials and tries to get all customers
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/customer/"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with wrong credentials and tries to get all customers
    Given 'amr'|'test12'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]
    When the client after auth "GET" "/customer/"
    Then the client receives status code of [401]

  Scenario: admin sign in with right credentials and tries to get customers with name
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/customer/byName?name=amr"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with wrong credentials and tries to get customers with name
    Given 'amr'|'test'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]
    When the client after auth "GET" "/customer/byName?name=amr"
    Then the client receives status code of [401]

  Scenario: admin sign in with right credentials and tries to get customers with wrong name
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/customer/byName?name=omar"
    Then the client receives status code of [204]

  Scenario: admin sign in with right credentials and tries to get count of customers before 2023-02-21
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/customer/countByDate?date=2023-02-21"
    Then the client receives status code of [200]

  Scenario: admin sign in with right credentials and tries to delete customers with id
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | ids  |
      | List |
      | 5    |
    When the client after auth "DELETE" "/customer/deleteById"
    Then the client receives status code of [200,204]





