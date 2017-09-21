# Vue table(grid) component
========

- sorting
- filtering
- grouping 
- table mode
- grid mode
- data binding

## Live Demo
- [full exaple](https://rawgit.com/d-kochanzhi/cmp-table/master/examples/index.html)


## Usage

### Direct include

Just import the `cmp-table.js` after `vue.js` library in your page like so.
```html
	<script src="js/vue.js"></script>	
	<script src="js/cmp-table.js"></script>
```

### Slots

- [1] table-th-add
- [2] table-group-header
- [3] table-row
- [4] table-td-add
- [5] table-row-add
- [6] table-group-add
- [7] table-footer
 
![image](https://github.com/d-kochanzhi/cmp-table/raw/master/examples/2017-09-21_11-00-27.png)

### Css
i did not include any css into the project, but there is minimal style for example

```css
th.sortable{
	cursor:pointer;
}			
th.active .arrow {
	opacity: 1;
	position: absolute;
}
.arrow {
	display: inline-block;
	vertical-align: middle;
	width: 0;
	height: 0;
	margin-left: 10px;
	opacity: 0.66;
}
 .arrow.asc {
 	border-left: 4px solid transparent;
 	border-right: 4px solid transparent;
 	border-bottom: 4px solid #080808;
 }
 .arrow.dsc {
	border-left: 4px solid transparent;
 	border-right: 4px solid transparent;
 	border-top: 4px solid #080808;
 }
```



## License

This project is licensed under the MIT License

