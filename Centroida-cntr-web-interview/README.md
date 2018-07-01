# Centroida Frontend developer interview assignment

### Assignment goal

Implement a basic address book single page web app. 
Perform simple HTTP calls and data manipulation actions with Angular framework. 
Show your best coding habits so we can evaluate how suitable you are for the role.

### Core tasks

The followings are core tasks. You need to complete all of them in order to be considered a suitable candidate. 

- If you are not familiar with Angular 2+ before, please quickly go through the tutorial on this [official docs](https://angular.io/tutorial) or any other online tutorial you feel comfortable with.
- Get the assignment project up and running with Angular Cli on your local environment using localhost:4200
- Make proper planning and implement the missing part of routing rules in `add-routing.module.ts`.
- Implement `AddressService`, get initial address book data from the URL end point listed in `address.service.ts`
- Remove dummy static addresses from home screen, use the dynamic data from `AddressService` instead.
- Implement `create()` action in `HomeComponent`, when user click Create button, jump to address details screen.
- Implement `Save()` and `delete()` actions in `AddressDetailsComponent`. When user clicks either button, jump back to home screen. You only need to save data in memory (means they get lost when user refresh browser).
- Pack all files you think necessary to review your assignment into a zip, and send us back.

### Bonus tasks

These are optional bonus tasks. Complete all or part of them will significantly increase your chance to be considered as qualified candidates from the technical point of view.

- Use browser storage such as local-storage or indexedDB to make user's address data persist.
- Add pagination to address list with a maximum of 4 addresses per page. Implement pagination UI controls by Bootstrap v4.
- Implement a Cancel button inside `AddressDetailsComponent`. Cancel all changes and go back to home screen when user clicks it.
- Properly comment your code in order to show your thoughts for implementation.
- Any other features that you think can demonstrate your skills for this role.
