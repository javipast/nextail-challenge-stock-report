# Nextail Challenge exercise

Replicate given layout and functionality.

## Briefing

Nextail executes a stock analysis every day in order to determine which products suffer major stock outs in customer's stores.
This information is critical to store managers in order to improve sales, so it was decided to make a new report.

Store managers will check this report to get information about this products, and when they are done with them, will mark them as complete.

## Business Requirements

- This report will show products with major stockouts ordered by sales ranking.
- Every product will be represented with a card showing the info provided in example image.
- Any warehouse coverage below 50% is considered to be &quot;Very low&quot;.
- When a user hovers cursor on product card a &quot;Mark Complete&quot; label must be shown.
- After that, if user clicks on a product card, confirmation must be ask: "Are you sure you want to mark this product as complete".
- Confirmed products will be deleted from report.

## Tech Requirements

- Recreate a new report using HTML, CSS and JS.
- Product data will be loaded from provided products.json in data folder
- Product images will be loaded from images folder. Each image is related to the product through product code.
- We don't expect it to be a perfect match. It's open book, feel free to hit Google or use any framework or utility, but be prepared to explain your solution.

## Assumptions:

- Code atrtibute is unique.
- Stockout Rate and Warehouse Coverage represents a percentage in a range of 0-1. 
- Stockout bar color is always the same, no matter what value is displaying.
- The number in the top left corner of each card belongs to "Sales Ranking", and should not change when cards are rearranged.
- Completion prompt inside cards shoud not return to "action" state when the user has clicked it and moves the cursor out of the card.
- Top value in size stock chart should be 1 unit higher that the highest of all values.

## Clarifications:

- Modified slightly some colors from the reference design for readability.
