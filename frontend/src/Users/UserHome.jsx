import React from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useState } from "react"
import { useUserLogout } from "../Hooks/useUserLogout";
const UserHome = () => {
	const { user } = useAuthContext()

  const { userlogout } = useUserLogout()
  const handleClick = () => {
    userlogout()
    window.location.href = "/";
  }

  return (
<main role="main">
<button class="btn btn-light" onClick={handleClick}>Log out</button>
<div class="bg-light"  >
    <div class="container">
      <h1 class="display-3">Hello, Mr. {user.usernameee}!</h1>
      <p>you are the user you can manage your staff, customers, items, and view orders from this website by interacting with the given pages
        </p>
      <p>
        you can also create unique and exclusive promotions and rewards for VIP customers
      </p>
    </div>
</div>
  <div class="container-fluid bg-light">
    <div class="row">
      <div class="col-md-4">
        <h2>Customers</h2>
        <p>View and Manage Your Customers and their Reward Points
        </p>
        <p>
          <a class="btn btn-dark" href="/customers" role="button">View Customers &raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Staff</h2>
        <p>View and Manage Your Staff Roles in the Restaurant
        </p>
        <p>
          <a class="btn btn-dark" href="staffs" role="button">View Staff &raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Needed Items</h2>
        <p>This Page Tells Which Items Need Refilling.</p>
        <p>
          <a class="btn btn-dark" href="/pages/dailyneededitems" role="button">View Needed Items &raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2> Add Promotions</h2>
        <p>This Page Gives You The Freedom To Add New Promotions</p>
        <p>
          <a class="btn btn-dark" href="/users/userpromotions" role="button">Make New Promotions&raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Item View</h2>
        <p>View And Manage Your Items</p>
        <p>
          <a class="btn btn-dark" href="/items" role="button">Manage Items&raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Restaurant Tables</h2>
        <p>View Existing Tables And What Tables Are Reserved</p>
        <p>
          <a class="btn btn-dark" href="/tables" role="button">Manage Tables&raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Reserved Tables</h2>
        <p>This Page Shows You The Reservations Made By Customers</p>
        <p>
          <a class="btn btn-dark" href="/users/reservedtables" role="button"> View Reserved Tables&raquo;</a>
        </p>
      </div>
      <div class="col-md-4">
        <h2>Customer Orders</h2>
        <p>This Shows You The Orders Made By Customers</p>
        <p>
          <a class="btn btn-dark" href="/users/vieworder/" role="button"> View Orders &raquo;</a>
        </p>
      </div>
    </div>
    <hr/>
  </div>
</main>


  )
}
export default UserHome