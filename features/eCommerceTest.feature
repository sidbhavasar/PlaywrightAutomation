Feature: eCommerce Validations

  Scenario: Validate Order Creation and Verify Order
    Given valid login credentials "username" and "password" are provided to login
    When product "ADIDAS ORIGINAL" is added to cart
    Then Cart Page should have product "ADIDAS ORIGINAL" present
    Then email id "testersign@gmail.com" is present in email field on Checkout page
    When country " India" is selected in country
    Then text " Thankyou for the order. " is displayed on confirmation page