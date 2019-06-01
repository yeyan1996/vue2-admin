import { Loading } from "element-ui";
import { ElLoadingComponent } from "element-ui/types/loading";
let needLoadingRequestCount: number = 0;
let loading: ElLoadingComponent;
export function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.2)",
    customClass: "custom_loading_class"
  });
}
export function endLoading() {
  loading.close();
}

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
