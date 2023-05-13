Feature:worker

  Scenario: admin sign in with right credentials and tries to add a worker
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | firstName | lastName | phoneNumber | address |
      | String    | String   | String      | String  |
      | Worker    | Test     | 0569518004  | Nablus  |
    When the client after auth "POST" "/worker/save"
    Then the client receives status code of [200]

  Scenario: admin sign in with right credentials and tries to update a worker
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    Given request body
      | firstName | lastName | phoneNumber | address |
      | String    | String   | String      | String  |
      | Worker    | One      | 0599999999  | Nablus  |
    When the client after auth "PUT" "/worker/update/1"
    Then the client receives status code of [200,204]


  Scenario: admin sign in with right credentials and tries to get all workers
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/worker/"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with wrong credentials and tries to get all workers
    Given 'amr'|'test12'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]
    When the client after auth "GET" "/worker/"
    Then the client receives status code of [401]

  Scenario: admin sign in with right credentials and tries to get workers with name
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/worker/byName?name=amr"
    Then the client receives status code of [200,204]

  Scenario: admin sign in with wrong credentials and tries to get workers with name
    Given 'amr'|'test'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [401]
    When the client after auth "GET" "/worker/byName?name=amr"
    Then the client receives status code of [401]

  Scenario: admin sign in with right credentials and tries to get workers with wrong name
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/worker/byName?name=omar"
    Then the client receives status code of [204]

  Scenario: admin sign in with right credentials and tries to get count of workers before 2023-02-21
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "GET" "/worker/countByDate?date=2023-02-21"
    Then the client receives status code of [200]

  Scenario: admin sign in with right credentials and tries to delete workers with id
    Given 'amr'|'test123'
    When the client calls "/api/auth/signin"
    Then the client receives status code of [200]
    When the client after auth "DELETE" "/worker/unemploy?id=13"
    Then the client receives status code of [200,204]





