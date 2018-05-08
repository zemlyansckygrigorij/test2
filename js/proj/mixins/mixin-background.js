	// Примесь для задания background страницы и боковых меню
export default {
	data () {
		return {
        	Background : this.Background
		}
	},
	mounted () {
		this.Background = this.$ls.get('activeBackground', 'dark');
	},
};