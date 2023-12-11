import avatar1 from 'public/images/seller_avatar/nguyen_tung.jpg';
import avatar2 from 'public/images/seller_avatar/pham_dung.jpg';
import avatar3 from 'public/images/seller_avatar/vo_van_kieu.jpg';
import avatar4 from 'public/images/seller_avatar/trang_vu.jpg';
import avatar5 from 'public/images/seller_avatar/lan_dinh.jpg';
import avatar6 from 'public/images/seller_avatar/quang_huy.jpg';
import avatar7 from 'public/images/seller_avatar/nguyen_duc_long.png';
import avatar8 from 'public/images/seller_avatar/ngoc_trinh.png';
import avatar9 from 'public/images/seller_avatar/tran_thanh_quy.jpg';
import avatar10 from 'public/images/seller_avatar/hau_somi.jpg';
import post from 'public/images/post.png';
import { getFrontUserBaseURL, getFullPathImage } from 'services/BaseService';
import { cui, datetime, makeGetWithConfigs } from 'utils';
import { DATE_FORMAT } from 'components/contants';

const items = [
  {
    content: 'MonsPrints đã giúp mình -  một người chập chững bước chân vào con đường kinh doanh POD đạt được kết quả kinh doanh ấn tượng. Các seller chưa có kinh nghiệm yên tâm đã có đội ngũ support hỗ trợ khách hàng rất kịp thời và tận tình. Chúc MonsPrints ngày càng phát triển.',
    avatar: avatar1,
    name: 'Nguyễn Tùng',
    work: 'Seller'
  },
  {
    content: 'Mình đánh giá cao dịch vụ fulfill của MonsPrints, giá cả cạnh tranh và chất lượng sản phẩm tốt, khách hàng phản hồi tích cực. Hệ thống website cực tiện lợi, cập nhật trạng thái đơn hàng chi tiết và thường xuyên, tối ưu hóa quá trình kinh doanh của các seller.',
    avatar: avatar2,
    name: 'Phạm Dũng',
    work: 'Seller'
  },
  {
    content: 'Dịch vụ tốt, catalog đa dạng nhiều mẫu mã, mình hài lòng với chất lượng sản phẩm và dịch vụ. Bên cạnh đó MonsPrints luôn có giá cạnh tranh cho seller. Hài lòng với dịch vụ của MonsPrints.',
    avatar: avatar4,
    name: 'Trang Vũ',
    work: 'Seller'
  },
  {
    content: 'Platform của MonsPrints dễ dùng và rất tiện lợi, bên cạnh đó có các support hỗ trợ tận tình. Rất hài lòng với chất lượng sản phẩm, thời gian sản xuất và vận chuyển nhanh. ',
    avatar: avatar3,
    name: 'Võ Văn Kiều',
    work: 'Seller'
  },
  {
    content: 'Khuyến khích các seller trải nghiệm dịch vụ của MonsPrints. Mình đánh giá cao sự nhiệt tình hỗ trợ nhanh chóng của nhóm MonsPrints trong quá trình vận hành kinh doanh. ',
    avatar: avatar5,
    name: 'Lân Đình',
    work: 'Seller'
  },
  {
    content: 'Kinh doanh POD và dropship trở nên rất đơn giản với MonsPrints. Mình chỉ cần lên ý tưởng về sản phẩm và nghiên cứu đón đầu thị trường. Mọi việc từ sản xuất đến ship hàng đã có MonsPrints lo hết. Vô cùng tiện lợi và tối ưu.',
    avatar: avatar6,
    name: 'Quang Huy',
    work: 'Seller'
  },
  {
    content: 'Chọn đối tác fulfillment phù hợp cực kì quan trọng trong quá trình kinh doanh, mình cực kì recommend MonsPrints vì giá cả cạnh tranh và chất lượng sản phẩm tốt. ',
    avatar: avatar7,
    name: 'Nguyễn Đức Long',
    work: 'Seller'
  },
  {
    content: 'Khách hàng phản hồi rất tích cực về sản phẩm fulfill tại MonsPrints : Tôi chỉ muốn cho bạn biết rằng chiếc áo hoodie lông cừu có khóa kéo của bạn là chiếc áo hoodie ấm áp nhất, mềm mại nhất, thoải mái nhất mà tôi từng mặc trong đời.',
    avatar: avatar8,
    name: 'Ngọc Trinh',
    work: 'Seller'
  },
  {
    content: 'MonsPrints là dịch vụ vận chuyển trực tuyến yêu thích của tôi. Đường may được cải thiện sau khi một số mẫu ban đầu có một số đường chỉ bị lỏng ở đường may. Thời gian vận chuyển đã được cải thiện và tôi hầu như nhận được các mặt hàng của mình khoảng hai tuần sau khi đặt hàng. Đơn đặt hàng của tôi giao đến Hoa Kỳ. Sản phẩm và dịch vụ từ MonsPrints có chất lượng tốt.',
    avatar: avatar9,
    name: 'Trần Thành Quý',
    work: 'Seller'
  },
  {
    content: 'Tôi phải nói rằng MonsPrints là một trong những công ty cung cấp dịch vụ theo yêu cầu tốt nhất hiện có và tôi đánh giá cao cách bạn giữ mức giá cạnh tranh và phí vận chuyển thấp. Đội ngũ hỗ trợ rất ấn tượng. Họ quan tâm đến tất cả những gì tôi cần.',
    avatar: avatar10,
    name: 'Hậu Sơmi',
    work: 'Seller'
  },
];

function getPosts(params, successCallback, failureCallback) {
  const { pageNum, pageSize } = params;
  successCallback({
    items: items.filter((item, index) => Math.floor(index / pageSize) === (pageNum - 1) ),
    totalCount: items.length,
  });
}

const transformBlog = item => {
  const convertedUpdatedDate = !!item.modifiedAt ? datetime.convert(item.modifiedAt, "MMM DD, YYYY") : datetime.convert(new Date(), DATE_FORMAT);
  return {
    ...item,
    image: getFullPathImage(item.featureImage) || post,
    headerTitle: convertedUpdatedDate,
    title: item.title,
    description: item.description,
    content: item.content,
    blogSlug: item.slug,
    blogId: item.id,
    blogCategoryId: item.blogCategoryId,
    blogCategoryName: item.blogCategory?.name || '',
    blogCategorySlug: item.blogCategory?.slug || '',
  }
}

function getBlogs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/blogs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformBlog)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}
function getBlog(id, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/blogs/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformBlog);
}

const transformBlogCategory = item => {
  return {
    ...item,
    blogCategoryId: item.id,
    blogCategorySlug: item.slug,
  }
}

function getBlogsCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/blog-categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = cui.sortBy((response.content || []).map(transformBlogCategory), 'displayOrder');
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

export {
  getPosts,
  getBlogs,
  getBlog,
  getBlogsCategories,
}
