
<div class="pull-left"><strong>Per Page:&nbsp;&nbsp;</strong></div>
<div class="pull-left">
    <select>
        <option value="5" <%= perPage == 5 ? 'selected' : null %> >5</option>
        <option value="10" <%= perPage == 10 ? 'selected' : null %> >10</option>
        <option value="15" <%= perPage == 15 ? 'selected' : null %> >15</option>
    </select>
</div>

<div class="pages-count rs-fs-medium pull-left">
    &nbsp;&nbsp;&nbsp;&nbsp;<strong>Results</strong> <%= lowermostPageInView %> - <%= uppermostPageInView %> of <%= totalAmount %>
</div>

<% if (isPaginationShown) { %>
<ul class="pagination pull-right">
    <li class="<%= offset === 1 ? 'disabled' : 'page' %>">
        <a href="#<%= (parseInt(offset) - 1) %>">Previous</a>
    </li>

    <%= helperWritePages(totalPages, offset) %>

    <li class="<%= offset === totalPages ? 'disabled' : 'page' %>">
        <a href="#<%= (parseInt(offset) + 1) %>">Next</a>
    </li>
</ul>
<% } %>
<br>
