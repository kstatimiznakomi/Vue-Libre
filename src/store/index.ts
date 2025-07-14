import {createStore} from 'vuex'
import {AuthModule} from '@/store/authStore';

export const store = createStore({
    modules: {
        auth: AuthModule,
    },
})
