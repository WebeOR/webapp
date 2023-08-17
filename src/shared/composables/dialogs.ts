import type {
  ExtractPropTypes,
  WritableComputedOptions,
} from 'vue'

import type {
  AvailableDialogBehavior,
  AvailableDialogMode,
} from 'src/types/dialogs'

interface Props {
  modelValue: { type: BooleanConstructor }
  behavior: { type: PropType<AvailableDialogBehavior> }
  mode: { type: PropType<AvailableDialogMode> }
  name: { type: PropType<string> }
}

type PropsType = Readonly<ExtractPropTypes<Props>>
type EmitsType = (event: 'cancel' | 'update:modelValue', ...args: any[]) => void

interface DialogBehaviorModelReturn {
  key: ComputedRef<string>
  routerModel: WritableComputedOptions<boolean>
  model: Ref<boolean>
}

export function useDialogBehaviorModel(props: PropsType, emit: EmitsType): DialogBehaviorModelReturn {
  const route = useRoute()
  const router = useRouter()

  const { behavior, mode, name } = toRefs(props)

  const localModel = shallowRef<boolean>(false)

  const key = computed<string>(() => `${get(mode)}-${get(name)}-dialog`)

  const routerModel: WritableComputedOptions<boolean> = {
    get: () => route.query.show === get(key),
    set: async (v) => {
      const { query } = route
      await router.replace({
        query: v ? { ...query, show: get(key) } : {},
      })
      if (!v) {
        delete query.show
        emit('cancel')
        router.replace({ query })
      }
    },
  }

  const model = computed<boolean>({
    get: () => {
      let resolver: Ref<boolean>

      switch (get(behavior)) {
        case 'parental':
          resolver = useVModel(props, 'modelValue')
          break
        case 'router':
          resolver = computed<boolean>(routerModel)
          break
        default:
          resolver = localModel
          break
      }

      return resolver.value
    },
    set: (v) => {
      let target: Ref<boolean>

      switch (get(behavior)) {
        case 'parental':
          target = useVModel(props, 'modelValue')
          break
        case 'router':
          target = computed<boolean>(routerModel)
          break
        default:
          target = localModel
          break
      }

      target.value = v
    },
  })

  return {
    key,
    model,
    routerModel,
  }
}
