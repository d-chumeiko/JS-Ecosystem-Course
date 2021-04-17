<form class="form-inline">
    <input type="text" class="form-control search-value" placeholder="Filter value" value="<%= requestConfig.searchValue %>">
    <select class="form-control search-by">
        <% _.each(options, function (option){ %>
            <option value="<%= option.value %>" <%= option.value === requestConfig.searchBy ? 'selected' : null %>>
                <%= option.name %>
            </option>
        <% }) %>
    </select>
    <button type="submit" class="btn btn-default">Filter</button>
    &nbsp;&nbsp;<a href="#">reset</a>
</form>