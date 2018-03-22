"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) { return typeof obj; } : function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.component('cmp-table-textbox', {
    template: '<input  ref="input" \
        v-bind:value="value" \
		v-on:keypress="isValidChar($event)" \
		v-on:keyup="isValidValue($event)" \
        v-on:blur="updateValue($event.target.value)">\
    </input>',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        colKey: {
            type: String,
            default: ''
        },
        rowKey: {
            type: [String, Number],
            default: ''
        },
        control: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {
            dataValue: this.value
        };
    },

    methods: {
        updateValue: function updateValue(value) {
            this.dataValue = value;
            this.$emit('valueUpdated', [this.colKey, this.rowKey, this.dataValue]);
        },
        isValidValue: function isValidValue(evt) {
            switch (this.control.datatype) {
                case 'decimal':
                    this.$refs.input.value = this.$refs.input.value.replace(/[^0-9\.-]/g, '');
                    break;
                case 'number':
                    this.$refs.input.value = this.$refs.input.value.replace(/[^\d].+/, '');
                    break;
            };
        },
        isValidChar: function isValidChar(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;

            switch (this.control.datatype) {
                case 'decimal':
                    if (charCode != 45 && charCode != 46 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault();
                    }
                    break;
                case 'number':
                    if (charCode != 45 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault();
                    }
                    break;
                default:
                    /*text, allow all*/
                    return true;
            }
        }
    }
});

Vue.component('cmp-table-select', {
    template: '<select  ref="select"\
        v-on:change="updateValue($event.target.value)">\
    <option v-for="item in control.source" \
        v-bind:value="item.value"\
        v-bind:selected="item.value==value">{{item.text}}</option>\
    </select>',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        colKey: {
            type: String,
            default: ''
        },
        rowKey: {
            type: [String, Number],
            default: ''
        },
        control: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {
            dataValue: this.value
        };
    },
    watch: {
        "value": function(newValue) {
            this.dataValue = newValue;
        }
    },
    methods: {
        updateValue: function(value) {
            this.dataValue = value;
            this.$emit('valueUpdated', [this.colKey, this.rowKey, this.dataValue]);
        }
    }

});

Vue.component('cmp-table-radio', {
    template: '<div>\
		<label v-for="item in control.source">\
			<input type="radio" \
			v-bind:value="item.value" \
			v-bind:checked="item.value==value" \
			v-bind:name="colKey+rowKey"\
			v-on:change="updateValue($event.target.value)"\
			/>{{item.text}}</label>\
		</div>\
    ',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        colKey: {
            type: String,
            default: ''
        },
        rowKey: {
            type: [String, Number],
            default: ''
        },
        control: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {
            dataValue: this.value
        };
    },
    watch: {
        "value": function value(newValue) {
            this.dataValue = newValue;
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.dataValue = value;
            this.$emit('valueUpdated', [this.colKey, this.rowKey, this.dataValue]);
        }
    }

});

Vue.component('cmp-table-checkbox', {
    template: '<div>\
        <label v-for="item in control.source">\
            <input type="checkbox" \
			v-model="dataValue" \
            v-bind:value="item.value"\
            v-bind:name="colKey + rowKey"\
            v-on:change="updateValue($event.target.value)"\
            />{{item.text}}</label>\
        </div>\
    ',
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        colKey: {
            type: String,
            default: ''
        },
        rowKey: {
            type: [String, Number],
            default: ''
        },
        control: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {
            dataValue: this.getFormatedValue()
        };
    },
    watch: {
        "value": function value(newValue) {
            this.dataValue = this.getFormatedValue();
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('valueUpdated', [this.colKey, this.rowKey, this.dataValue]);
        },
        getFormatedValue: function getFormatedValue() {
            if (typeof this.value === 'string') return [this.value];
            if (typeof this.value === 'number') return [this.value];
            if (typeof this.value === 'array') return this.value;
            if (!this.value) return [];
            return this.value;
        }
    }

});

Vue.component('cmp-table', {
    props: {
        styleClass: {
            default: 'table table-bordered'
        },
        lineNumbers: {
            default: function _default() {
                return {
                    show: false,
                    throughGroups: false
                };
            }
        },
        title: '',
        columns: {},
        rows: {},
        groups: {
            type: Array,
            default: function _default() {
                return [{
                    field: null,
                    value: null,
                    title: null
                }];
            }
        },
        gridMode: {
            default: false
        },
        filterKey: {
            type: String,
            default: ''
        }
    },
    template: '\
            <div>\
                <div v-if="title" class="table-header clearfix">\
                    <h2 class="table-title pull-left">{{title}}</h2>\
                </div>\
                <table ref="table" v-bind:class="styleClass">\
                <thead>\
                <slot name="table-header" v-bind:columns="processedColumns">\
                    <tr>\
                        <th v-if="lineNumbers.show" class="line-numbers"></th>\
                            <th v-for="(column, index) in processedColumns"\
                                    v-bind:class="[{ active: column.sortable && sortKey == column.field } , {sortable : column.sortable}, getCssStyle(column, \'th\')] "\
                                    v-bind:style="{width: column.width ? column.width : \'auto\'}"\
                                    v-if="!column.hidden"\
                                    v-on:click="sortBy(column)">{{column.label}}<span v-if="column.sortable && sortKey == column.field" class="arrow" v-bind:class="sortOrder > 0 ? \'asc\' : \'dsc\'"></span>\
                            </th>\
                        <slot name="table-th-add"></slot>\
                    </tr>\
                   </slot>\
                </thead>\
                <tbody>\
				<template v-for="(group, gindex) in processedGroups">\
					<template v-if="group && group.field">\
						<slot name="table-group-header" v-bind:group="group" v-bind:groupindex="gindex" v-bind:rows="getGroupedRows(group)"></slot>\
					</template>\
					<template v-for="(row, rindex) in getGroupedRows(group)">\
						  <tr>\
							 <td v-if="lineNumbers.show" class="line-numbers">{{ getLineNumber(gindex,rindex) }}</td>\
							 <slot name="table-row" v-bind:row="row" v-bind:rowindex="rindex">\
							 <td v-for="(column, cindex) in processedColumns" v-bind:class="getCssStyle(column, \'td\')" v-if="!column.hidden">\
								<slot v-bind:name="\'column-\' + String(column.field)"\
										v-bind:column="column"\
										v-bind:row="row"\
										v-bind:colKey="String(column.field)"\
										v-bind:rowKey="getIdentityColumn() ? getPropertyValue(row, getIdentityColumn().field): null"\
										v-bind:value="getPropertyValue(row, column.field)"\
										v-bind:valueFormatted="getPropertyFormattedValue(row, column.field)"\
										v-bind:isEditableColumn="isEditableColumn(column)"\
										>\
									<template v-if="!isEditableColumn(column)">{{getPropertyFormattedValue(row, column)}}</template>\
									<template v-if="isEditableColumn(column)">\
											<cmp-table-textbox v-if="column.control.type==\'textbox\'" \
												v-bind:control="column.control" \
												v-bind:colKey="String(column.field)" \
												v-bind:rowKey="getPropertyValue(row, getIdentityColumn().field)"\
												v-bind:value="getPropertyValue(row, column.field)"\
												v-on:valueUpdated="onCellUpdated"></cmp-table-textbox>\
											<cmp-table-select v-if="column.control.type==\'select\'" \
												v-bind:control="column.control" \
												v-bind:colKey="String(column.field)" \
												v-bind:rowKey="getPropertyValue(row,  getIdentityColumn().field)"\
												v-bind:value="getPropertyValue(row, column.field)"\
												v-on:valueUpdated="onCellUpdated"></cmp-table-select>\
											<cmp-table-radio v-if="column.control.type==\'radio\'" \
												v-bind:control="column.control" \
												v-bind:colKey="String(column.field)" \
												v-bind:rowKey="getPropertyValue(row,  getIdentityColumn().field)"\
												v-bind:value="getPropertyValue(row, column.field)"\
												v-on:valueUpdated="onCellUpdated"></cmp-table-radio>\
											<cmp-table-checkbox v-if="column.control.type==\'checkbox\'" \
												v-bind:control="column.control" \
												v-bind:colKey="String(column.field)" \
												v-bind:rowKey="getPropertyValue(row,  getIdentityColumn().field)"\
												v-bind:value="getPropertyValue(row, column.field)"\
												v-on:valueUpdated="onCellUpdated"></cmp-table-checkbox>\
									</template>\
								</slot>\
							  </td>\
							</slot>\
							<slot name="table-td-add" v-bind:row="row" v-bind:rowindex="rindex" v-bind:group="group"></slot>\
						  </tr>\
						  <slot name="table-row-add" v-bind:row="row" v-bind:rowindex="rindex" v-bind:group="group" v-bind:groupindex="gindex" v-bind:rows="getGroupedRows(group)"></slot>\
					</template>\
					<template v-if="group && group.field">\
						<slot name="table-group-add" v-bind:group="group" v-bind:groupindex="gindex" v-bind:rows="getGroupedRows(group)"></slot>\
					</template>\
				</template>\
                </tbody>\
                <tfoot>\
                 <slot name="table-footer"></slot>\
                </tfoot>\
                </table>\
            </div>\
    ',
    data: function data() {
        return {
            sortKey: '',
            sortOrder: 1
        };
    },
    mounted: function mounted() {
        if (this.gridMode && !this.getIdentityColumn()) this.warn('You must declare an identity column in grid-mode');
    },
    methods: {
        warn: function warn(msg) {
            if (typeof console !== 'undefined') console.warn(msg);
        },
        isEditableColumn: function isEditableColumn(column) {
            return this.gridMode && !column.readonly;
        },
        getLineNumber: function getLineNumber(gindex, rindex) {
            var count = 0;
            if (gindex == 0 | !this.lineNumbers.throughGroups) return rindex + 1;
            for (var i = 0; i < gindex; i++) {
                count += this.getGroupedRows(this.processedGroups[i]).length;
            }
            return count + rindex + 1;
        },
        getCssStyle: function getCssStyle(column, type) {
            var classString = '';
            if (typeof type !== 'undefined' && column.hasOwnProperty(type + 'class')) {
                classString = column[type + 'class'];
            } else {
                switch (column.type) {
                    case 'number':
                    case 'decimal':
                    case 'date':
                        classString = 'right-align ';
                        break;
                    default:
                        classString = 'left-align ';
                        break;
                }
            }
            return classString;
        },
        getDataFormattedValue: function getDataFormattedValue(value, column) {

            function formatDecimal(v) {
                // convert to decimal
                var f = parseFloat(Math.round(v * 100) / 100);
                return isNaN(f) ? null : f;
            }

            function formatDate(v) {
                // convert to date
                var d = Date.parse(v);
                return isNaN(d) ? null : new Date(d);
            }

            function formatNumber(v) {
                // convert to number         
                var n = Number(v);
                return isNaN(n) ? null : n;
            }
            if (value === undefined || value === '') return null;

            switch (column.type) {
                case 'decimal':
                    return formatDecimal(value);
                case 'date':
                    return formatDate(value);
                case 'number':
                    return formatNumber(value);
                default:
                    return value;
            }
        },
        getPropertyValue: function getPropertyValue(row, field) {
            function dig(obj, selector) {
                var result = obj;
                var splitter = selector.split('.');
                for (var i = 0; i < splitter.length; i++) {
                    if (typeof result === 'undefined') return undefined;
                    else result = result[splitter[i]];
                }
                return result;
            }
            if (typeof field === 'function') return field(row);
            else if (typeof field === 'string') return dig(row, field);
            else return undefined;
        },
        getPropertyFormattedValue: function getPropertyFormattedValue(row, column) {
            /*if column has data source {text:'qwer', value:1} formated value will be text */
            function toString(arr) {
                var result = '';
                if (arr.length > 1) arr.forEach(function(item) {
                    result += item.text + '; ';
                });
                else if (arr[0]) result = arr[0].text;
                return result;
            };

            var value = this.getPropertyValue(row, column.field);

            if (column.control && column.control.source.length > 0) {
                var foundItem = column.control.source.filter(function(item) {
                    if (value && (typeof value === 'array' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) return value.indexOf(item.value) > -1;
                    else return item.value == value;
                });
                if (foundItem) return toString(foundItem);
            }
            return value;
        },
        getIdentityColumn: function getIdentityColumn() {
            var cols = this.processedColumns.filter(function(item) {
                return item.identity == true;
            });
            if (!cols || cols.length == 0) return null;
            else return cols[0];
        },
        getGroupedRows: function getGroupedRows(group) {
            var self = this;

            /*Be careful, value:null means show all items in datasource, by default*/
            if (!group || group.field == null) return this.processedRows;

            if (this.processedRows.length > 0 && !this.processedRows[0].hasOwnProperty(group.field)) this.warn('Datasource does not have field [' + group.field + '] that represent in groups');

            /*Be careful, value:undefined means show all other items in datasource that not included in groups*/
            if (group && group.value == undefined && this.processedGroups.length > 1) return this.processedRows.filter(function(item) {
                var _item = item;
                var _inGroup = false;
                self.processedGroups.forEach(function(g) {
                    if (!_inGroup && g.value !== undefined) //not current undefined
                        _inGroup = _item[g.field] == g.value;
                });
                return !_inGroup;
            });

            return this.processedRows.filter(function(item) {
                return item[group.field] == group.value;
            });
        },
        onCellUpdated: function onCellUpdated(arg) {

            function getColumnByField(columns, field) {
                return columns.filter(function(item) {
                    return item.field == field;
                })[0];
            };

            var col = this.getIdentityColumn();
            var colKey = arg[0];
            var rowKey = arg[1];
            var value = this.getDataFormattedValue(arg[2], getColumnByField(this.processedColumns, colKey));

            var elementPos = this.rows.findIndex(function(x) {
                return x[col.field] == rowKey;
            });
            var element = this.rows[elementPos];
            element[colKey] = value;
            this.$set(this.rows, elementPos, element);
            this.$emit('cmp-table-cell-updated', [colKey, rowKey, value]);
        },
        sortBy: function sortBy(column) {
            if (column.sortable) {
                this.sortKey = column.field;
                this.sortOrder = this.sortOrder * -1;
            }
        }
    },
    computed: {
        processedRows: function processedRows(group) {
            var self = this;
            var sortKey = this.sortKey;
            var order = this.sortOrder || 1;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var data = this.rows;

            if (filterKey) {
                var filterableCols = this.processedColumns.filter(function(item) {
                    return item.filterable == true;
                });
                if (filterableCols && filterableCols.length > 0) data = data.filter(function(row) {
                    return filterableCols.some(function(c) {
                        return String(self.getPropertyFormattedValue(row, c)).toLowerCase().indexOf(filterKey) > -1;
                    });
                });
                else this.warn('You are trying to filter but there are no columns that support filters [use filterable:true]');
            }

            if (sortKey) {
                data = data.slice().sort(function(a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }

            return data;
        },
        processedGroups: function processedGroups() {
            return this.groups;
        },
        processedColumns: function processedColumns() {

            var result = [];
            this.columns.forEach(function(c, i) {
                var obj = {
                    field: c.field === undefined ? '' : c.field,
                    label: c.label === undefined ? '' : c.label,
                    identity: c.identity === undefined ? false : c.identity,
                    hidden: c.hidden === undefined ? false : c.hidden,
                    type: c.type === undefined ? 'text' : c.type,
                    readonly: c.readonly === undefined ? false : c.readonly,
                    thclass: c.thclass === undefined ? '' : c.thclass,
                    tdclass: c.tdclass === undefined ? '' : c.tdclass,
                    width: c.width === undefined ? 'auto' : c.width,
                    sortable: c.sortable === undefined ? false : c.sortable,
                    filterable: c.filterable === undefined ? false : c.filterable,
                    control: {
                        datatype: c.type === undefined ? 'text' : c.type,
                        type: c.control === undefined || c.control.type === undefined ? "textbox" : c.control.type,
                        source: c.control === undefined || c.control.source === undefined ? [] : c.control.source
                    }
                };
                result.push(obj);
            });

            return result;
        }
    }
});