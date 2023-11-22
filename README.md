# SFRA Training Base Repo
=================

# This project was an academic experience, where real tasks were carried out, with everyday problems at the SalesForce company.

# In each Pull Request have the required task, with its solution.

# Task 1:

Effort: Easy
Deadline: 4h
Difficulties/learning points:

ISML templates
Resource.msgf
Find and update .isml template which is responsible for PLP (product list page)
Objective:

Modify the product tile for products that have a sale price to show a custom message (“Best Deal”). Also, calculate the percentage of discount between the standard price and the sale price and display it.

![image](https://github.com/vbreksidler/sfcc-academy-victor-bariatto-reksidler/assets/94481634/b71ba0ba-cfeb-4d26-8740-46a3d47d8f83)


# Task 2:

Effort: Easy-Medium
Deadline: 6h
Difficulties/learning points:

Use dw.catalog.ProductSearchModel() to retrieve and sort products from the category
Use isloop tag to iterate products inside .isml template
Objective:

Create a new template to be used in PDP that displays 4 products which belong to the same primary category as the current product and are sorted from 

the lowest price to the highest.

# Task 3:

Effort: Easy
Deadline: 4h
Difficulties/learning points:

Use Resource.msg in order to display the message.
Template Include
Controllers Include
Extend Controllers
Get info from Basket
Objective:

Display a message on the cart page if the customer has over 200 dollars in the cart.

Restrictions:

Retrieve the threshold value from Site Preferences
The displayed image must have a yellow-like background to look like a warning

# Task 4:

Effort: Medium
Deadline: 6h
Difficulties/learning points:

Use the Email model to send an email to the user
Create an ISML template in templates/default/mail for visualizing information.
Objective:

Modify the Cart functionality so that each time a user adds an item to the cart, an email message is sent to the user's email address with information regarding the item.

Restrictions:

If you modify or create a site preference, you must update the corresponding metadata file in the repo.

# Task 5:

Effort: Hard
Deadline: 16h
Difficulties/learning points:

Email
Transactions
Campaigns
Promotions
Coupons
Templates
Forms
Custom Objects
Objective:

Create a form for a Newsletter. Create a campaign based on coupons (type: System-generated codes coupons) that offers $20 off to each order. 

Each time a user subscribes to the newsletter and his email is saved in the CO, assign a new coupon code to him and save it in the CO. 

Also send an email to the customer with the coupon code. 

Restrictions:

It must not be allowed for the same email be used twice. 
If no coupon code is available anymore, send an email apologizing to the user
If you modify or create a site preference or custom object, you must update the corresponding metadata file in the repo.
