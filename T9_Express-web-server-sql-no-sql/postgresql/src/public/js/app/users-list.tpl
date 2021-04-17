<button type="button" class="btn btn-primary user-form">Create entry</button><br/><br/>

<div class="filter"></div>

<% if(collection.length){ %>
<div class="pagination-holder"></div>

<table class="table table-bordered table-hover">
    <tr>
        <th class="sortable <%= requestConfig.sortBy === 'firstName' ? requestConfig.sortDir : null %>" data-sortby="firstName">First Name</th>
        <th class="sortable <%= requestConfig.sortBy === 'lastName' ? requestConfig.sortDir : null %>" data-sortby="lastName">Last Name</th>
        <th class="sortable <%= requestConfig.sortBy === 'company' ? requestConfig.sortDir : null %>" data-sortby="company">Company</th>
        <th class="sortable <%= requestConfig.sortBy === 'position' ? requestConfig.sortDir : null %>" data-sortby="position">Job Position</th>
        <th class="sortable <%= requestConfig.sortBy === 'email' ? requestConfig.sortDir : null %>" data-sortby="email">Email</th>
        <th class="sortable <%= requestConfig.sortBy === 'phoneNumber' ? requestConfig.sortDir : null %>" data-sortby="phoneNumber">Phone Number</th>
        <th></th>
    </tr>
    <% _.each(collection, function(user){ %>
    <tr>
        <td><%= user.firstName %></td>
        <td><%= user.lastName %></td>
        <td><%= user.company %></td>
        <td><%= user.position %></td>
        <td><%= user.email %></td>
        <td><%= user.phoneNumber %></td>
        <td>
            <button type="button" data-id="<%= user.id %>" class="btn btn-primary btn-xs user-form">Edit</button>
            <button type="button" data-id="<%= user.id %>" class="btn btn-danger btn-xs delete-user">Delete</button>
        </td>
    </tr>
    <% }) %>
</table>
<% } else{ %>
<p class="bg-warning" style="padding: 15px;">There is no any user in DataBase.</p>
<% } %>

<div class="users-form"></div>