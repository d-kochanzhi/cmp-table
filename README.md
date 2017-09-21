# Vue table(grid) component

- table-mode
- grid-mode
- slots
- sorting
- filtering
- grouping
- data binding
- readonly columns
- rendering text by values/codes

## Dependencies

* Vue.js (>=2.0)


## Live Demo
- [full example](https://rawgit.com/d-kochanzhi/cmp-table/master/examples/index.html)


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

### Options


Option | Type | Description | Default
-------|------|-------------|--------
field | String | datasource field name | ''
label | String | column title | ''
identity | Boolean | identity column, required in grid-mode | false
hidden | Boolean | hide column | false
type | String | [text, decimal, number, date] | 'text'
readonly | Boolean | readonly column in grid-mode | false
thclass | String | th css class | ''
tdclass | String | td css class | ''
width | String | column width | ''
sortable | Boolean | allow sort by column | false
filterable | Boolean | allow filter by column | false
control | object | column control settings | ''
control.type | String |[textbox, select, radio, checkbox] | 'textbox'
control.source | Array |Example [{text:'Title', value:0}] | []



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

### Example
```js
new Vue({
	el:'#app'	,
	data: function () {
        return {  			
            columns: [                       
                        {
                            label: 'Position',
                            field: 'Position',
                            type: 'number',						
                            control: {                             
                                source: [					
                                    { text: 'Actor', value: 1 },
                                    { text: 'Writer', value: 2 },
                                    { text: 'Character', value: 3 }
                                ]
                            }
                        }					

            ],			
            rows: [
                  { Position: 1},
				  { Position: 2}              
            ]
        }
    }
});
```
```html
<cmp-table          
 	v-bind:columns="columns"
 	v-bind:rows="rows">					  
 </cmp-table>
```
we have datasource ROWS with values or codes, but it will be rendered as text:
[simple example](https://rawgit.com/d-kochanzhi/cmp-table/master/examples/simple.html)

![image](https://github.com/d-kochanzhi/cmp-table/raw/master/examples/2017-09-21_12-17-45.png)


## License

This project is licensed under the MIT License

